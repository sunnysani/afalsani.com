import {
  Box, AppBar, Toolbar, IconButton, Typography,
  Breadcrumbs, Link, useMediaQuery, Tooltip,
} from '@mui/material'
import {
  ArrowBack, HomeOutlined,
  LightModeOutlined, DarkModeOutlined,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { alpha, useTheme } from '@mui/material/styles'
import { useThemeMode } from '../context/ThemeContext'

const ROUTE_LABELS = {
  '/': 'Home',
  '/portfolio': 'Portfolio',
  '/my-tools': 'My Tools',
  '/my-tools/expense': 'Expense Tracker',
}

function buildCrumbs(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  const crumbs = [{ label: 'Home', path: '/' }]
  let current = ''
  for (const part of parts) {
    current += `/${part}`
    const label = ROUTE_LABELS[current]
    if (label) crumbs.push({ label, path: current })
  }
  return crumbs
}

export default function AppLayout({ children, title, maxWidth = 'lg' }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()
  const { toggleMode } = useThemeMode()
  const isDark = theme.palette.mode === 'dark'

  const crumbs = buildCrumbs(pathname)
  const pageTitle = title || ROUTE_LABELS[pathname] || 'Personal Hub'

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: isDark
            ? alpha(theme.palette.background.default, 0.88)
            : alpha(theme.palette.background.paper, 0.92),
          backdropFilter: 'blur(16px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            size="small"
            onClick={() => navigate(-1)}
            sx={{
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2),
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.18) },
              mr: 0.5,
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: '"Sora", sans-serif',
              fontWeight: 700,
              flexGrow: 1,
              letterSpacing: '-0.01em',
              fontSize: isMobile ? '0.9rem' : '1rem',
              color: 'text.primary',
            }}
          >
            {pageTitle}
          </Typography>

          <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              size="small"
              onClick={toggleMode}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              {isDark ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
            </IconButton>
          </Tooltip>

          <IconButton
            size="small"
            onClick={() => navigate('/')}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <HomeOutlined fontSize="small" />
          </IconButton>
        </Toolbar>

        {crumbs.length > 1 && (
          <Box sx={{ px: 2, pb: 1, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Breadcrumbs
              sx={{
                '& .MuiBreadcrumbs-separator': {
                  color: alpha(theme.palette.text.secondary, 0.5),
                  mx: 0.5,
                },
              }}
            >
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1
                return isLast ? (
                  <Typography
                    key={c.path}
                    sx={{ fontSize: '0.72rem', color: 'primary.main', fontWeight: 600 }}
                  >
                    {c.label}
                  </Typography>
                ) : (
                  <Link
                    key={c.path}
                    onClick={() => navigate(c.path)}
                    underline="hover"
                    sx={{
                      fontSize: '0.72rem',
                      color: 'text.secondary',
                      cursor: 'pointer',
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {c.label}
                  </Link>
                )
              })}
            </Breadcrumbs>
          </Box>
        )}
      </AppBar>

      <Box
        sx={{
          maxWidth: maxWidth === 'lg' ? 1100 : maxWidth === 'md' ? 768 : 600,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, md: 4 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
