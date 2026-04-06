import { Box, Typography, Grid } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { ArrowOutward, ReceiptLongOutlined } from '@mui/icons-material'
import AppLayout from '../components/AppLayout'

const TOOLS = [
  {
    id: 'expense',
    path: '/my-tools/expense',
    label: 'Expense Tracker',
    sub: 'Log daily spending directly into Google Sheets',
    icon: ReceiptLongOutlined,
    status: 'Active',
  },
]

export default function MyToolsPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const accent = theme.palette.primary.main

  return (
    <AppLayout title="My Tools">
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'primary.main',
          }}
        >
          Workspace
        </Typography>
        <Typography
          variant="h3"
          sx={{
            mt: 0.75,
            mb: 1.5,
            fontSize: { xs: '1.8rem', sm: '2.3rem' },
            color: 'text.primary',
          }}
        >
          My Tools
        </Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 420, lineHeight: 1.7 }}>
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
                  p: 3,
                  height: '100%',
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.divider}`,
                  bgcolor: 'background.paper',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.4,0,0.2,1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    border: `1px solid ${alpha(accent, 0.4)}`,
                    transform: 'translateY(-3px)',
                    boxShadow: isDark
                      ? `0 12px 36px ${alpha(accent, 0.14)}`
                      : `0 6px 24px ${alpha(accent, 0.16)}`,
                    '& .tool-arrow': { opacity: 1, transform: 'translate(2px,-2px)' },
                  },
                }}
              >
                {/* Top */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: alpha(accent, isDark ? 0.12 : 0.09),
                      border: `1px solid ${alpha(accent, isDark ? 0.2 : 0.16)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon sx={{ color: accent, fontSize: 22 }} />
                  </Box>
                  <ArrowOutward
                    className="tool-arrow"
                    sx={{ color: accent, opacity: 0, fontSize: 18, transition: 'all 0.2s ease' }}
                  />
                </Box>

                {/* Status badge */}
                <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, mb: 1.5 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      boxShadow: `0 0 5px ${theme.palette.success.main}`,
                    }}
                  />
                  <Typography
                    sx={{ fontSize: '0.65rem', color: 'success.main', fontWeight: 600, letterSpacing: '0.08em' }}
                  >
                    {tool.status}
                  </Typography>
                </Box>

                <Typography variant="h6" sx={{ mb: 0.75, fontWeight: 700, fontSize: '1rem', color: 'text.primary' }}>
                  {tool.label}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, fontSize: '0.83rem' }}>
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
              p: 3,
              height: '100%',
              minHeight: 160,
              borderRadius: 3,
              border: `1px dashed ${alpha(theme.palette.text.secondary, 0.2)}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Typography sx={{ color: alpha(theme.palette.text.secondary, 0.4), fontSize: '1.6rem', fontWeight: 300 }}>
              +
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>More tools coming</Typography>
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
