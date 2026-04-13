import { Box, Typography, Grid } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { ArrowOutward, ReceiptLongOutlined } from '@mui/icons-material'
import AppLayout from '../components/AppLayout'

const TOOLS = [
  {
    id:     'expense',
    path:   '/my-tools/expense',
    label:  'Expense Tracker',
    sub:    'Log daily spending directly into Google Sheets',
    icon:   ReceiptLongOutlined,
    status: 'Active',
  },
]

export default function MyToolsPage() {
  const navigate = useNavigate()
  const theme    = useTheme()
  const isDark   = theme.palette.mode === 'dark'
  const accent   = theme.palette.primary.main

  return (
    <AppLayout title="My Tools">
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography
          sx={{
            fontSize:      '0.68rem',
            fontWeight:    600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'primary.main',
            opacity:       0.8,
          }}
        >
          Workspace
        </Typography>
        <Typography
          variant="h3"
          sx={{
            mt:       0.75,
            mb:       1.5,
            fontSize: { xs: '1.9rem', sm: '2.4rem' },
            color:    'text.primary',
          }}
        >
          My Tools
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 400, lineHeight: 1.75, fontSize: '0.95rem' }}>
          Personal utilities to make daily tasks faster and smarter.
        </Typography>
      </Box>

      {/* Tools grid */}
      <Grid container spacing={2.5}>
        {TOOLS.map((tool) => {
          const Icon = tool.icon
          return (
            <Grid item xs={12} sm={6} md={4} key={tool.id}>
              <Box
                onClick={() => navigate(tool.path)}
                sx={{
                  p:          3,
                  height:     '100%',
                  borderRadius: '16px',
                  border:     `1px solid ${theme.palette.divider}`,
                  borderTop:  `2px solid ${accent}`,
                  bgcolor:    'background.paper',
                  cursor:     'pointer',
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                  position:   'relative',
                  overflow:   'hidden',
                  '&:hover': {
                    transform:  'translateY(-4px)',
                    boxShadow:  isDark
                      ? `0 16px 40px ${alpha(accent, 0.14)}, 0 0 0 1px ${alpha(accent, 0.18)}`
                      : `0 10px 30px ${alpha(accent, 0.18)}, 0 0 0 1px ${alpha(accent, 0.13)}`,
                    '& .tool-arrow': { opacity: 1, transform: 'translate(2px,-2px)' },
                    '& .tool-icon': { bgcolor: alpha(accent, isDark ? 0.2 : 0.15) },
                  },
                  '&:active': { transform: 'translateY(-2px)' },
                }}
              >
                {/* Top row */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                  <Box
                    className="tool-icon"
                    sx={{
                      width:          48,
                      height:         48,
                      borderRadius:   '13px',
                      bgcolor:        alpha(accent, isDark ? 0.12 : 0.1),
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'center',
                      transition:     'background-color 0.2s ease',
                    }}
                  >
                    <Icon sx={{ color: accent, fontSize: 22 }} />
                  </Box>
                  <ArrowOutward
                    className="tool-arrow"
                    sx={{ color: accent, opacity: 0.2, fontSize: 18, transition: 'all 0.2s ease' }}
                  />
                </Box>

                {/* Status badge */}
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.7, mb: 1.5 }}>
                  <Box
                    sx={{
                      width:      6,
                      height:     6,
                      borderRadius: '50%',
                      bgcolor:    'success.main',
                      boxShadow:  `0 0 6px ${theme.palette.success.main}`,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize:      '0.63rem',
                      color:         'success.main',
                      fontWeight:    600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tool.status}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  sx={{ mb: 0.75, fontWeight: 700, fontSize: '1rem', color: 'text.primary', letterSpacing: '-0.01em' }}
                >
                  {tool.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.85rem' }}
                >
                  {tool.sub}
                </Typography>
              </Box>
            </Grid>
          )
        })}

        {/* Placeholder */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              p:              3,
              height:         '100%',
              minHeight:      168,
              borderRadius:   '16px',
              border:         `1.5px dashed ${alpha(theme.palette.text.secondary, 0.18)}`,
              display:        'flex',
              flexDirection:  'column',
              alignItems:     'center',
              justifyContent: 'center',
              gap:            1,
            }}
          >
            <Typography
              sx={{ color: alpha(theme.palette.text.secondary, 0.35), fontSize: '1.4rem', fontWeight: 300, lineHeight: 1 }}
            >
              +
            </Typography>
            <Typography sx={{ color: alpha(theme.palette.text.secondary, 0.5), fontSize: '0.8rem' }}>
              More coming soon
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
