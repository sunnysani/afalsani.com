import { useState, useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  Box, Typography, TextField, Button, Select, MenuItem, FormControl,
  InputLabel, InputAdornment, IconButton, Chip, Divider, Alert, Snackbar,
  Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress,
  Collapse, Paper,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import {
  AddOutlined, DeleteOutline, CheckCircleOutline, KeyOutlined,
  VisibilityOutlined, VisibilityOffOutlined, InfoOutlined,
  SaveOutlined, PlayArrowOutlined, CloseOutlined, EditOutlined,
  ExpandMoreOutlined, ExpandLessOutlined,
} from '@mui/icons-material'
import { format } from 'date-fns'
import AppLayout from '../../components/AppLayout'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { appendSheetRow, resolveSheetName } from '../../lib/sheetsApi'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  'Shadaqah', 'Transport', 'Consumables', 'Health', 'Learning',
  'Offline Purchase', 'Online Purchase', 'Gifts', 'Hangout', 'Other',
]

const LS_API_KEY = 'pjh_sheets_api_key'
const LS_CONFIGS = 'pjh_sheet_configs'

const EMPTY_FORM = {
  paymentMethod: '',
  description: '',
  category: '',
  amountRaw: '',
  references: '',
}

const EMPTY_CONFIG_DRAFT = { alias: '', spreadsheetId: '', gid: '' }

// ─── Amount formatting helpers ─────────────────────────────────────────────

function formatThousands(raw) {
  const digits = raw.replace(/\D/g, '')
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function toSheetAmount(formatted) {
  return formatted ? `Rp${formatted}` : ''
}

// ─── Section card wrapper ──────────────────────────────────────────────────

function SectionCard({ children, sx = {} }) {
  const theme = useTheme()
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: 'background.paper',
        ...sx,
      }}
    >
      {children}
    </Paper>
  )
}

function SectionTitle({ icon: Icon, title, subtitle, action }) {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        {Icon && (
          <Box
            sx={{
              mt: 0.2,
              width: 36, height: 36, borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 18, color: 'primary.main' }} />
          </Box>
        )}
        <Box>
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, color: 'text.primary' }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mt: 0.3 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {action}
    </Box>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function ExpensePage() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const primary = theme.palette.primary.main
  const secondary = theme.palette.secondary.main

  // Persisted state
  const [apiKey, setApiKey] = useLocalStorage(LS_API_KEY, '')
  const [configs, setConfigs] = useLocalStorage(LS_CONFIGS, [])

  // UI state
  const [showApiKey, setShowApiKey] = useState(false)
  const [activeConfig, setActiveConfig] = useState(null)
  const [configOpen, setConfigOpen] = useState(true)
  const [addingConfig, setAddingConfig] = useState(false)
  const [configDraft, setConfigDraft] = useState(EMPTY_CONFIG_DRAFT)
  const [configDraftErr, setConfigDraftErr] = useState({})
  const [editingConfigId, setEditingConfigId] = useState(null)

  // Form state
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErr, setFormErr] = useState({})

  // Feedback
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [deleteDialogConfig, setDeleteDialogConfig] = useState(null)

  // ── Mutation ──────────────────────────────────────────────────────────────

  const submitMutation = useMutation({
    mutationFn: async (formData) => {
      if (!activeConfig) throw new Error('No sheet configuration selected.')
      if (!apiKey.trim()) throw new Error('API Key is required.')

      const sheetName = await resolveSheetName(activeConfig.spreadsheetId, activeConfig.gid, apiKey.trim())
      const now = format(new Date(), 'dd/MM/yy HH:mm')
      const amount = toSheetAmount(formData.amountRaw)

      const row = [
        now,
        formData.paymentMethod,
        formData.description,
        formData.category,
        amount,
        formData.references,
      ]

      return appendSheetRow(activeConfig.spreadsheetId, sheetName, apiKey.trim(), row)
    },
    onSuccess: () => {
      setSnackbar({ open: true, message: 'Expense recorded successfully! 🎉', severity: 'success' })
      setForm(EMPTY_FORM)
      setFormErr({})
    },
    onError: (err) => {
      setSnackbar({ open: true, message: err.message || 'Something went wrong.', severity: 'error' })
    },
  })

  // ── Config handlers ───────────────────────────────────────────────────────

  const validateConfigDraft = () => {
    const errs = {}
    if (!configDraft.alias.trim()) errs.alias = 'Alias is required'
    if (!configDraft.spreadsheetId.trim()) errs.spreadsheetId = 'Spreadsheet ID is required'
    if (!configDraft.gid.trim()) errs.gid = 'GID is required'
    else if (isNaN(Number(configDraft.gid))) errs.gid = 'GID must be a number'
    setConfigDraftErr(errs)
    return Object.keys(errs).length === 0
  }

  const handleSaveConfig = () => {
    if (!validateConfigDraft()) return
    if (editingConfigId) {
      setConfigs((prev) =>
        prev.map((c) => (c.id === editingConfigId ? { ...c, ...configDraft } : c)),
      )
      if (activeConfig?.id === editingConfigId) {
        setActiveConfig((prev) => ({ ...prev, ...configDraft }))
      }
    } else {
      const newConfig = { id: crypto.randomUUID(), ...configDraft }
      setConfigs((prev) => [...prev, newConfig])
    }
    setConfigDraft(EMPTY_CONFIG_DRAFT)
    setConfigDraftErr({})
    setAddingConfig(false)
    setEditingConfigId(null)
  }

  const handleCancelConfig = () => {
    setConfigDraft(EMPTY_CONFIG_DRAFT)
    setConfigDraftErr({})
    setAddingConfig(false)
    setEditingConfigId(null)
  }

  const handleEditConfig = (cfg) => {
    setConfigDraft({ alias: cfg.alias, spreadsheetId: cfg.spreadsheetId, gid: cfg.gid })
    setEditingConfigId(cfg.id)
    setAddingConfig(true)
    setConfigOpen(true)
  }

  const handleDeleteConfig = (cfg) => setDeleteDialogConfig(cfg)

  const confirmDelete = () => {
    setConfigs((prev) => prev.filter((c) => c.id !== deleteDialogConfig.id))
    if (activeConfig?.id === deleteDialogConfig.id) setActiveConfig(null)
    setDeleteDialogConfig(null)
  }

  const handleSelectConfig = (cfg) => {
    setActiveConfig((prev) => (prev?.id === cfg.id ? null : cfg))
    setConfigOpen(false)
  }

  // ── Form handlers ─────────────────────────────────────────────────────────

  const validateForm = () => {
    const errs = {}
    if (!form.paymentMethod.trim()) errs.paymentMethod = 'Required'
    if (!form.description.trim()) errs.description = 'Required'
    if (!form.category) errs.category = 'Required'
    if (!form.amountRaw.trim()) errs.amountRaw = 'Required'
    setFormErr(errs)
    return Object.keys(errs).length === 0
  }

  const handleFormChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (formErr[field]) setFormErr((prev) => ({ ...prev, [field]: undefined }))
  }, [formErr])

  const handleAmountChange = (e) => {
    const formatted = formatThousands(e.target.value)
    handleFormChange('amountRaw', formatted)
  }

  const handleSubmit = () => {
    if (!validateForm()) return
    submitMutation.mutate(form)
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <AppLayout title="Expense Tracker" maxWidth="md">

      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'primary.main',
          }}
        >
          My Tools
        </Typography>
        <Typography
          variant="h3"
          sx={{
            mt: 0.75,
            mb: 1,
            fontSize: { xs: '1.7rem', sm: '2.2rem' },
            color: 'text.primary',
          }}
        >
          Expense Tracker
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.65 }}>
          Log spending directly into your Google Sheet.
        </Typography>
      </Box>

      {/* ── Section 1: API Key ─────────────────────────────────────────────── */}
      <SectionCard sx={{ mb: 2.5 }}>
        <SectionTitle
          icon={KeyOutlined}
          title="Google Sheets API Key"
          subtitle="Applies to all sheet configurations"
          action={
            <Tooltip
              title={
                <Box>
                  <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>Two ways to authenticate:</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                    1. <strong>OAuth Bearer token</strong> (starts with ya29.) — for write access.<br />
                    Get one at developers.google.com/oauthplayground using the Sheets API v4 scope.
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block' }}>
                    2. <strong>API Key</strong> — works for public sheets. Write access requires OAuth.
                  </Typography>
                </Box>
              }
              placement="left"
            >
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <InfoOutlined fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        />

        <TextField
          fullWidth
          label="API Key / Bearer Token"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type={showApiKey ? 'text' : 'password'}
          placeholder="Paste your Google API key or OAuth Bearer token…"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setShowApiKey((v) => !v)} edge="end">
                  {showApiKey ? <VisibilityOffOutlined fontSize="small" /> : <VisibilityOutlined fontSize="small" />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {apiKey.startsWith('ya29.') && (
          <Alert
            severity="info"
            icon={false}
            sx={{
              mt: 1.5,
              py: 0.5,
              fontSize: '0.78rem',
              bgcolor: alpha(secondary, isDark ? 0.1 : 0.07),
              border: `1px solid ${alpha(secondary, isDark ? 0.25 : 0.2)}`,
              color: secondary,
            }}
          >
            OAuth Bearer token detected — write access enabled. Note: tokens expire in ~1 hour.
          </Alert>
        )}
      </SectionCard>

      {/* ── Section 2: Sheet Configurations ─────────────────────────────────── */}
      <SectionCard sx={{ mb: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: configOpen ? 3 : 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, color: 'text.primary' }}>
              Sheet Configurations
            </Typography>
            {activeConfig && !configOpen && (
              <Chip
                size="small"
                label={activeConfig.alias}
                color="primary"
                sx={{ height: 22, fontSize: '0.72rem', fontWeight: 600 }}
              />
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!addingConfig && (
              <Button
                size="small"
                startIcon={<AddOutlined />}
                onClick={() => { setAddingConfig(true); setConfigOpen(true) }}
                sx={{
                  fontSize: '0.78rem',
                  color: 'primary.main',
                  '&:hover': { bgcolor: alpha(primary, 0.08) },
                }}
              >
                Add
              </Button>
            )}
            <IconButton size="small" onClick={() => setConfigOpen((v) => !v)} sx={{ color: 'text.secondary' }}>
              {configOpen ? <ExpandLessOutlined fontSize="small" /> : <ExpandMoreOutlined fontSize="small" />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={configOpen}>
          {/* Saved configs list */}
          {configs.length > 0 && (
            <Box sx={{ mb: addingConfig ? 3 : 0 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem', mb: 1.5, fontWeight: 500 }}>
                Saved configurations — click to select
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {configs.map((cfg) => {
                  const isActive = activeConfig?.id === cfg.id
                  return (
                    <Box
                      key={cfg.id}
                      onClick={() => handleSelectConfig(cfg)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        border: isActive
                          ? `1px solid ${alpha(primary, 0.5)}`
                          : `1px solid ${theme.palette.divider}`,
                        bgcolor: isActive
                          ? alpha(primary, isDark ? 0.08 : 0.06)
                          : alpha(theme.palette.text.primary, 0.02),
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          border: `1px solid ${alpha(primary, 0.3)}`,
                          bgcolor: alpha(primary, isDark ? 0.05 : 0.04),
                        },
                      }}
                    >
                      {isActive ? (
                        <CheckCircleOutline sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} />
                      ) : (
                        <Box
                          sx={{
                            width: 18, height: 18, borderRadius: '50%',
                            border: `1.5px solid ${alpha(theme.palette.text.secondary, 0.3)}`,
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: isActive ? 'primary.main' : 'text.primary' }}>
                          {cfg.alias}
                        </Typography>
                        <Typography
                          sx={{
                            color: 'text.secondary', fontSize: '0.72rem',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}
                        >
                          ID: {cfg.spreadsheetId} · GID: {cfg.gid}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); handleEditConfig(cfg) }}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                          >
                            <EditOutlined sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton
                            size="small"
                            onClick={(e) => { e.stopPropagation(); handleDeleteConfig(cfg) }}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                          >
                            <DeleteOutline sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )}

          {configs.length === 0 && !addingConfig && (
            <Box
              sx={{
                py: 4, textAlign: 'center',
                border: `1px dashed ${alpha(theme.palette.text.secondary, 0.2)}`,
                borderRadius: 2,
              }}
            >
              <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 1.5 }}>
                No configurations yet
              </Typography>
              <Button
                size="small"
                startIcon={<AddOutlined />}
                onClick={() => setAddingConfig(true)}
                variant="outlined"
                sx={{ borderColor: alpha(primary, 0.3), color: 'primary.main', fontSize: '0.8rem' }}
              >
                Add your first sheet
              </Button>
            </Box>
          )}

          {/* Add / Edit config form */}
          <Collapse in={addingConfig}>
            <Divider sx={{ my: 2.5, borderColor: theme.palette.divider }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.78rem', mb: 2, fontWeight: 600 }}>
              {editingConfigId ? 'Edit Configuration' : 'New Configuration'}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Alias"
                placeholder="e.g. Personal Budget 2025"
                size="small"
                fullWidth
                value={configDraft.alias}
                onChange={(e) => setConfigDraft((p) => ({ ...p, alias: e.target.value }))}
                error={!!configDraftErr.alias}
                helperText={configDraftErr.alias}
              />
              <TextField
                label="Spreadsheet ID"
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"
                size="small"
                fullWidth
                value={configDraft.spreadsheetId}
                onChange={(e) => setConfigDraft((p) => ({ ...p, spreadsheetId: e.target.value }))}
                error={!!configDraftErr.spreadsheetId}
                helperText={configDraftErr.spreadsheetId || 'Found in the Google Sheets URL after /d/'}
              />
              <TextField
                label="GID (Sheet Tab ID)"
                placeholder="0"
                size="small"
                fullWidth
                value={configDraft.gid}
                onChange={(e) => setConfigDraft((p) => ({ ...p, gid: e.target.value }))}
                error={!!configDraftErr.gid}
                helperText={configDraftErr.gid || 'Found in the URL as ?gid=xxxxx. First tab is usually 0.'}
              />
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  onClick={handleCancelConfig}
                  startIcon={<CloseOutlined />}
                  sx={{ color: 'text.secondary' }}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveOutlined />}
                  onClick={handleSaveConfig}
                >
                  {editingConfigId ? 'Update' : 'Save Configuration'}
                </Button>
              </Box>
            </Box>
          </Collapse>
        </Collapse>
      </SectionCard>

      {/* ── Section 3: Expense Form ──────────────────────────────────────────── */}
      <Collapse in={!!activeConfig && !!apiKey.trim()}>
        <SectionCard>
          <SectionTitle
            icon={PlayArrowOutlined}
            title="Add Expense"
            subtitle={activeConfig ? `Logging to: ${activeConfig.alias}` : ''}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

            {/* Row 1: Payment Method + Category */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Payment Method"
                placeholder="e.g. DANA, Cash, BCA"
                size="small"
                sx={{ flex: '1 1 200px' }}
                value={form.paymentMethod}
                onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                error={!!formErr.paymentMethod}
                helperText={formErr.paymentMethod}
              />

              <FormControl size="small" sx={{ flex: '1 1 200px' }} error={!!formErr.category}>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  value={form.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: 'background.paper',
                        border: `1px solid ${theme.palette.divider}`,
                      },
                    },
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat} sx={{ fontSize: '0.88rem' }}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
                {formErr.category && (
                  <Typography sx={{ color: 'error.main', fontSize: '0.72rem', mt: 0.5, ml: 1.5 }}>
                    {formErr.category}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Description */}
            <TextField
              label="Description"
              placeholder="What did you spend on?"
              size="small"
              fullWidth
              value={form.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              error={!!formErr.description}
              helperText={formErr.description}
            />

            {/* Row 2: Amount + References */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                label="Amount Paid"
                placeholder="150,000"
                size="small"
                sx={{ flex: '1 1 180px' }}
                value={form.amountRaw}
                onChange={handleAmountChange}
                error={!!formErr.amountRaw}
                helperText={formErr.amountRaw}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.9rem', fontFamily: '"Sora", sans-serif' }}>
                        Rp
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="References"
                placeholder="e.g. Receipt #1234, Order ID"
                size="small"
                sx={{ flex: '2 1 200px' }}
                value={form.references}
                onChange={(e) => handleFormChange('references', e.target.value)}
              />
            </Box>

            {/* Preview row */}
            {(form.paymentMethod || form.description || form.amountRaw) && (
              <Box
                sx={{
                  p: 2, borderRadius: 2,
                  bgcolor: alpha(primary, isDark ? 0.05 : 0.04),
                  border: `1px solid ${alpha(primary, isDark ? 0.15 : 0.12)}`,
                }}
              >
                <Typography sx={{ color: 'text.secondary', fontSize: '0.7rem', mb: 1, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Preview row
                </Typography>
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'text.secondary', wordBreak: 'break-all' }}>
                  <Box component="span" sx={{ color: 'primary.main' }}>{format(new Date(), 'dd/MM/yy HH:mm')}</Box>
                  {' · '}
                  {form.paymentMethod || '—'}
                  {' · '}
                  {form.description || '—'}
                  {' · '}
                  {form.category || '—'}
                  {' · '}
                  <Box component="span" sx={{ color: 'success.main' }}>
                    {form.amountRaw ? `Rp${form.amountRaw}` : '—'}
                  </Box>
                  {' · '}
                  {form.references || '—'}
                </Typography>
              </Box>
            )}

            {/* Submit */}
            <Divider sx={{ borderColor: theme.palette.divider }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5 }}>
              <Button
                size="medium"
                onClick={() => { setForm(EMPTY_FORM); setFormErr({}) }}
                sx={{
                  color: 'text.secondary',
                  '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.05) },
                }}
                disabled={submitMutation.isPending}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                startIcon={
                  submitMutation.isPending
                    ? <CircularProgress size={16} color="inherit" />
                    : <SaveOutlined />
                }
                sx={{ px: 4, minWidth: 160 }}
              >
                {submitMutation.isPending ? 'Saving…' : 'Save Expense'}
              </Button>
            </Box>
          </Box>
        </SectionCard>
      </Collapse>

      {/* Hint when no config selected */}
      {(!activeConfig || !apiKey.trim()) && configs.length > 0 && apiKey.trim() && (
        <Alert
          severity="info"
          icon={<InfoOutlined />}
          sx={{
            mt: 1,
            bgcolor: alpha(secondary, isDark ? 0.08 : 0.06),
            border: `1px solid ${alpha(secondary, isDark ? 0.22 : 0.18)}`,
            color: secondary,
            fontSize: '0.82rem',
          }}
        >
          Select a sheet configuration above to start logging expenses.
        </Alert>
      )}

      {!apiKey.trim() && (
        <Alert
          severity="warning"
          sx={{
            mt: 1,
            bgcolor: alpha(theme.palette.warning.main, isDark ? 0.08 : 0.06),
            border: `1px solid ${alpha(theme.palette.warning.main, isDark ? 0.22 : 0.18)}`,
            color: theme.palette.warning.main,
            fontSize: '0.82rem',
          }}
        >
          Enter your Google Sheets API Key or Bearer token above to continue.
        </Alert>
      )}

      {/* ── Snackbar ──────────────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((p) => ({ ...p, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.88rem' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* ── Delete Confirm Dialog ──────────────────────────────────────────── */}
      <Dialog
        open={!!deleteDialogConfig}
        onClose={() => setDeleteDialogConfig(null)}
        PaperProps={{ sx: { borderRadius: 3, minWidth: 300 } }}
      >
        <DialogTitle sx={{ fontFamily: '"Sora", sans-serif', fontWeight: 700, fontSize: '1rem', pb: 1 }}>
          Remove Configuration
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
            Remove <strong style={{ color: theme.palette.text.primary }}>{deleteDialogConfig?.alias}</strong>? This only removes it from local storage — your sheet data is untouched.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteDialogConfig(null)} sx={{ color: 'text.secondary' }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained" sx={{ borderRadius: 2 }}>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  )
}
