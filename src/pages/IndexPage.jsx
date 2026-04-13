import { Box, Typography, Grid, IconButton } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { ArrowOutward, FolderSpecialOutlined, BuildOutlined, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material'
import { useThemeMode } from '../context/ThemeContext'

export default function IndexPage() {
  const navigate     = useNavigate()
  const theme        = useTheme()
  const { toggleMode } = useThemeMode()
  const isDark       = theme.palette.mode === 'dark'

  const CARDS = [
    {
      id:      'portfolio',
      path:    '/portfolio',
      label:   'Portfolio',
      sub:     'Selected work, case studies, and projects',
      icon:    FolderSpecialOutlined,
      accent:  theme.palette.secondary.main,
      tag:     'Public',
    },
    {
      id:      'my-tools',
      path:    '/my-tools',
      label:   'My Tools',
      sub:     'Personal utilities and productivity tools',
      icon:    BuildOutlined,
      accent:  theme.palette.primary.main,
      tag:     'Private',
    },
  ]

  return (
    <Box
      sx={{
        minHeight:      '100dvh',
        bgcolor:        'background.default',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        px:             { xs: 2, sm: 4 },
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Theme toggle */}
      <Box sx={{ position: 'absolute', top: 20, right: 20, animation: 'fadeIn 0.5s ease both' }}>
        <IconButton
          onClick={toggleMode}
          size="small"
          sx={{
            width:   36,
            height:  36,
            color:   'text.secondary',
            bgcolor: 'background.paper',
            border:  `1px solid ${theme.palette.divider}`,
            transition: 'all 0.18s ease',
            '&:hover': {
              color:       'primary.main',
              borderColor: alpha(theme.palette.primary.main, 0.35),
              bgcolor:     alpha(theme.palette.primary.main, 0.07),
            },
          }}
        >
          {isDark
            ? <LightModeOutlined sx={{ fontSize: 16 }} />
            : <DarkModeOutlined  sx={{ fontSize: 16 }} />
          }
        </IconButton>
      </Box>

      {/* Ambient glow — top-left */}
      <Box sx={{
        position:      'absolute',
        top:           '-20%',
        left:          '-10%',
        width:         '50vw',
        height:        '50vw',
        borderRadius:  '50%',
        background:    `radial-gradient(circle, ${alpha(theme.palette.primary.main, isDark ? 0.06 : 0.05)} 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Ambient glow — bottom-right */}
      <Box sx={{
        position:      'absolute',
        bottom:        '-12%',
        right:         '-6%',
        width:         '44vw',
        height:        '44vw',
        borderRadius:  '50%',
        background:    `radial-gradient(circle, ${alpha(theme.palette.secondary.main, isDark ? 0.07 : 0.05)} 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <Box sx={{ position: 'relative', width: '100%', maxWidth: 660, textAlign: 'center' }}>

        {/* Small overline label */}
        <Typography
          sx={{
            fontSize:      '0.68rem',
            fontWeight:    600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'text.secondary',
            mb:            3.5,
            animation:     'fadeUp 0.5s ease both',
            animationDelay: '0.05s',
          }}
        >
          afalsani · personal hub
        </Typography>

        {/* Headline */}
        <Typography
          variant="h1"
          sx={{
            fontSize:        { xs: '2.8rem', sm: '3.8rem', md: '4.8rem' },
            lineHeight:      1.05,
            mb:              2.5,
            color:           'text.primary',
            textWrap:        'balance',
            animation:       'fadeUp 0.55s ease both',
            animationDelay:  '0.12s',
          }}
        >
          Where do you
          <br />
          <Box component="span" sx={{ color: 'primary.main' }}>
            want to go?
          </Box>
        </Typography>

        <Typography
          sx={{
            color:           'text.secondary',
            mb:              { xs: 6, md: 8 },
            fontSize:        '1rem',
            maxWidth:        420,
            mx:              'auto',
            lineHeight:      1.8,
            animation:       'fadeUp 0.55s ease both',
            animationDelay:  '0.2s',
            textWrap:        'pretty',
          }}
        >
          Portfolio is public-facing. My Tools is for afalsani's workspace.
        </Typography>

        {/* Cards */}
        <Grid container spacing={2} justifyContent="center">
          {CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <Grid
                item xs={12} sm={6}
                key={card.id}
                sx={{
                  animation:      'fadeUp 0.55s ease both',
                  animationDelay: `${0.28 + i * 0.1}s`,
                }}
              >
                <Box
                  onClick={() => navigate(card.path)}
                  sx={{
                    position:   'relative',
                    p:          { xs: 3, md: 3.5 },
                    borderRadius: '16px',
                    bgcolor:    'background.paper',
                    border:     `1px solid ${theme.palette.divider}`,
                    borderTop:  `2px solid ${card.accent}`,
                    cursor:     'pointer',
                    textAlign:  'left',
                    transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow:   'hidden',
                    '&:hover': {
                      transform:  'translateY(-4px)',
                      boxShadow:  isDark
                        ? `0 20px 48px ${alpha(card.accent, 0.14)}, 0 0 0 1px ${alpha(card.accent, 0.18)}`
                        : `0 12px 36px ${alpha(card.accent, 0.2)},  0 0 0 1px ${alpha(card.accent, 0.14)}`,
                      '& .card-arrow': {
                        opacity:   1,
                        transform: 'translate(2px, -2px)',
                      },
                      '& .card-icon': {
                        bgcolor: alpha(card.accent, isDark ? 0.2 : 0.15),
                      },
                    },
                    '&:active': { transform: 'translateY(-2px)' },
                  }}
                >
                  {/* Tag — plain text, no pill */}
                  <Typography
                    sx={{
                      fontSize:      '0.63rem',
                      fontWeight:    600,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:         card.accent,
                      opacity:       0.75,
                      mb:            3,
                    }}
                  >
                    {card.tag}
                  </Typography>

                  {/* Icon row */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                    <Box
                      className="card-icon"
                      sx={{
                        width:      52,
                        height:     52,
                        borderRadius: '14px',
                        bgcolor:    alpha(card.accent, isDark ? 0.12 : 0.1),
                        display:    'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.2s ease',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ color: card.accent, fontSize: 26 }} />
                    </Box>
                    <ArrowOutward
                      className="card-arrow"
                      sx={{
                        color:      card.accent,
                        opacity:    0.2,
                        fontSize:   18,
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      mb:            0.75,
                      color:         'text.primary',
                      fontWeight:    700,
                      fontSize:      '1.15rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {card.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', lineHeight: 1.75, fontSize: '0.875rem' }}
                  >
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
