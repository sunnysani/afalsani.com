import { Box, Typography, Grid, IconButton, Tooltip } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { ArrowOutward, WorkOutline, BuildOutlined, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { useThemeMode } from '../context/ThemeContext'

export default function IndexPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { toggleMode } = useThemeMode()
  const isDark = theme.palette.mode === 'dark'

  const CARDS = [
    {
      id: 'portfolio',
      path: '/portfolio',
      label: 'Portfolio',
      sub: 'Work, projects & selected case studies',
      icon: WorkOutline,
      accent: theme.palette.secondary.main,
      tag: 'Public',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, isDark ? 0.14 : 0.08)} 0%, ${alpha(theme.palette.secondary.main, isDark ? 0.04 : 0.02)} 100%)`,
    },
    {
      id: 'my-tools',
      path: '/my-tools',
      label: 'My Tools',
      sub: 'Personal utilities & productivity tools',
      icon: BuildOutlined,
      accent: theme.palette.primary.main,
      tag: 'Private',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, isDark ? 0.14 : 0.08)} 0%, ${alpha(theme.palette.primary.main, isDark ? 0.04 : 0.02)} 100%)`,
    },
  ]

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 4 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Theme toggle */}
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
          <IconButton
            onClick={toggleMode}
            size="small"
            sx={{
              color: 'text.secondary',
              bgcolor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(26,32,64,0.06)',
              border: `1px solid ${theme.palette.divider}`,
              '&:hover': {
                color: 'primary.main',
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            {isDark ? <LightModeOutlined fontSize="small" /> : <DarkModeOutlined fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Soft background blobs */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-5%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, isDark ? 0.07 : 0.06)} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-15%',
          right: '-5%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, isDark ? 0.07 : 0.06)} 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 680, textAlign: 'center' }}>
        {/* Greeting label */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.8,
            px: 1.8,
            py: 0.6,
            borderRadius: 5,
            bgcolor: alpha(theme.palette.primary.main, isDark ? 0.12 : 0.08),
            border: `1px solid ${alpha(theme.palette.primary.main, isDark ? 0.25 : 0.18)}`,
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              boxShadow: `0 0 6px ${alpha(theme.palette.primary.main, 0.8)}`,
            }}
          />
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: '0.06em',
            }}
          >
            Personal Hub
          </Typography>
        </Box>

        {/* Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
            lineHeight: 1.1,
            mb: 2,
            color: 'text.primary',
          }}
        >
          Where do you
          <br />
          <Box
            component="span"
            sx={{
              color: 'primary.main',
            }}
          >
            want to go?
          </Box>
        </Typography>

        <Typography
          sx={{
            color: 'text.secondary',
            mb: { xs: 5, md: 7 },
            fontSize: '1rem',
            maxWidth: 380,
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Portfolio is public-facing. My Tools is your personal workspace.
        </Typography>

        {/* Cards */}
        <Grid container spacing={2.5} justifyContent="center">
          {CARDS.map((card) => {
            const Icon = card.icon
            return (
              <Grid item xs={12} sm={6} key={card.id}>
                <Box
                  onClick={() => navigate(card.path)}
                  sx={{
                    position: 'relative',
                    p: { xs: 3, md: 3.5 },
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    background: card.gradient,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                    '&:hover': {
                      border: `1px solid ${alpha(card.accent, 0.4)}`,
                      transform: 'translateY(-3px)',
                      boxShadow: isDark
                        ? `0 16px 40px ${alpha(card.accent, 0.15)}`
                        : `0 8px 30px ${alpha(card.accent, 0.18)}`,
                      '& .card-arrow': { opacity: 1, transform: 'translate(2px, -2px)' },
                    },
                  }}
                >
                  {/* Tag */}
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 1.4,
                      py: 0.3,
                      borderRadius: 5,
                      border: `1px solid ${alpha(card.accent, isDark ? 0.3 : 0.25)}`,
                      bgcolor: alpha(card.accent, isDark ? 0.1 : 0.07),
                      mb: 2.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        color: card.accent,
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.tag}
                    </Typography>
                  </Box>

                  {/* Icon row */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2.5,
                        bgcolor: alpha(card.accent, isDark ? 0.12 : 0.1),
                        border: `1px solid ${alpha(card.accent, isDark ? 0.2 : 0.18)}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: card.accent, fontSize: 24 }} />
                    </Box>
                    <ArrowOutward
                      className="card-arrow"
                      sx={{
                        color: card.accent,
                        opacity: 0,
                        transition: 'all 0.2s ease',
                        fontSize: 20,
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{ mb: 0.75, color: 'text.primary', fontWeight: 700, fontSize: '1.1rem' }}
                  >
                    {card.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65 }}>
                    {card.sub}
                  </Typography>
                </Box>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
