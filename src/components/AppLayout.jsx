import {
  Box, AppBar, Toolbar, IconButton, Typography,
  Breadcrumbs, Link, useMediaQuery,
} from '@mui/material'
import {
  ArrowBack, HomeOutlined,
  LightModeOutlined, DarkModeOutlined,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { alpha, useTheme } from '@mui/material/styles'
import { useThemeMode } from '../context/ThemeContext'

const ROUTE_LABELS = {
  '/':               'Home',
  '/portfolio':      'Portfolio',
  '/my-tools':       'My Tools',
  '/my-tools/expense': 'Expense Tracker',
}

function buildCrumbs(pathname) {
  const parts  = pathname.split('/').filter(Boolean)
  const crumbs = [{ label: 'Home', path: '/' }]
  let current  = ''
  for (const part of parts) {
    current += `/${part}`
    const label = ROUTE_LABELS[current]
    if (label) crumbs.push({ label, path: current })
  }
  return crumbs
}

export default function AppLayout({ children, title, maxWidth = 'lg' }) {
  const navigate       = useNavigate()
  const { pathname }   = useLocation()
  const isMobile       = useMediaQuery('(max-width:600px)')
  const theme          = useTheme()
  const { toggleMode } = useThemeMode()
  const isDark         = theme.palette.mode === 'dark'

  const crumbs    = buildCrumbs(pathname)
  const pageTitle = title || ROUTE_LABELS[pathname] || 'afalsani'

  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor:        isDark
            ? alpha(theme.palette.background.default, 0.85)
            : alpha(theme.palette.background.paper,   0.9),
          backdropFilter: 'blur(20px)',
          borderBottom:   `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: { xs: 52, sm: 56 } }}>
          <IconButton
            size="small"
            onClick={() => navigate(-1)}
            sx={{
              color:       'primary.main',
              bgcolor:     alpha(theme.palette.primary.main, 0.08),
              border:      '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.18),
              width:       32,
              height:      32,
              transition:  'all 0.18s ease',
              '&:hover': {
                bgcolor:     alpha(theme.palette.primary.main, 0.15),
                borderColor: alpha(theme.palette.primary.main, 0.35),
              },
              mr: 0.5,
            }}
          >
            <ArrowBack sx={{ fontSize: 16 }} />
          </IconButton>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily:    '"Outfit", sans-serif',
              fontWeight:    700,
              flexGrow:      1,
              letterSpacing: '-0.01em',
              fontSize:      isMobile ? '0.9rem' : '1rem',
              color:         'text.primary',
            }}
          >
            {pageTitle}
          </Typography>

          <IconButton
            size="small"
            onClick={toggleMode}
            sx={{
              width:   32,
              height:  32,
              color:   'text.secondary',
              transition: 'all 0.18s ease',
              '&:hover': {
                color:   'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.07),
              },
            }}
          >
            {isDark
              ? <LightModeOutlined sx={{ fontSize: 16 }} />
              : <DarkModeOutlined  sx={{ fontSize: 16 }} />
            }
          </IconButton>

          <IconButton
            size="small"
            onClick={() => navigate('/')}
            sx={{
              width:   32,
              height:  32,
              color:   'text.secondary',
              transition: 'color 0.18s ease',
              '&:hover': { color: 'text.primary' },
            }}
          >
            <HomeOutlined sx={{ fontSize: 18 }} />
          </IconButton>
        </Toolbar>

        {crumbs.length > 1 && (
          <Box sx={{ px: 2, pb: 1, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Breadcrumbs
              sx={{
                '& .MuiBreadcrumbs-separator': {
                  color: alpha(theme.palette.text.secondary, 0.45),
                  mx:    0.5,
                },
              }}
            >
              {crumbs.map((c, i) => {
                const isLast = i === crumbs.length - 1
                return isLast ? (
                  <Typography
                    key={c.path}
                    sx={{ fontSize: '0.71rem', color: 'primary.main', fontWeight: 600 }}
                  >
                    {c.label}
                  </Typography>
                ) : (
                  <Link
                    key={c.path}
                    onClick={() => navigate(c.path)}
                    underline="hover"
                    sx={{
                      fontSize: '0.71rem',
                      color:    'text.secondary',
                      cursor:   'pointer',
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
          mx:       'auto',
          px:       { xs: 2, sm: 3, md: 4 },
          py:       { xs: 3.5, md: 5 },
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
