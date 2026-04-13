import { Box, Typography, Button } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, AutoAwesomeOutlined, DescriptionOutlined } from '@mui/icons-material'

export default function PortfolioPage() {
  const navigate = useNavigate()
  const theme    = useTheme()
  const isDark   = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        minHeight:      '100dvh',
        bgcolor:        'background.default',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        px:             3,
        position:       'relative',
        overflow:       'hidden',
      }}
    >
      {/* Ambient glow */}
      <Box sx={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        width:         '60vw',
        height:        '60vw',
        borderRadius:  '50%',
        background:    `radial-gradient(circle, ${alpha(theme.palette.secondary.main, isDark ? 0.08 : 0.06)} 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      <Box
        sx={{
          position:  'relative',
          textAlign: 'center',
          maxWidth:  420,
          animation: 'fadeUp 0.6s ease both',
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width:          72,
            height:         72,
            borderRadius:   '20px',
            bgcolor:        alpha(theme.palette.secondary.main, isDark ? 0.13 : 0.09),
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            mx:             'auto',
            mb:             4,
          }}
        >
          <AutoAwesomeOutlined sx={{ fontSize: 30, color: 'secondary.main' }} />
        </Box>

        <Typography
          sx={{
            fontSize:      '0.68rem',
            fontWeight:    600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         'secondary.main',
            opacity:       0.8,
            display:       'block',
            mb:            2,
          }}
        >
          In progress
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize:   { xs: '2rem', sm: '2.8rem' },
            lineHeight: 1.15,
            mb:         2,
            color:      'text.primary',
            textWrap:   'balance',
          }}
        >
          Something good
          <br />
          is on its way.
        </Typography>

        <Typography
          sx={{
            color:      'text.secondary',
            mb:         5,
            lineHeight: 1.8,
            fontSize:   '0.95rem',
            textWrap:   'pretty',
          }}
        >
          The portfolio is being put together carefully. In the meantime, the resume has the full picture.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<DescriptionOutlined />}
            href="https://docs.google.com/document/d/12J-2erEb8mM7j47PzqZo-IZKJUPBDcYGeWFmEX8yAh4/edit?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor:    alpha(theme.palette.secondary.main, isDark ? 0.16 : 0.1),
              color:      'secondary.main',
              boxShadow:  'none',
              border:     `1px solid ${alpha(theme.palette.secondary.main, isDark ? 0.3 : 0.22)}`,
              '&:hover': {
                bgcolor:   alpha(theme.palette.secondary.main, isDark ? 0.24 : 0.16),
                boxShadow: `0 4px 18px ${alpha(theme.palette.secondary.main, 0.26)}`,
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'scale(0.98)' },
            }}
          >
            View resume
          </Button>

          <Button
            variant="outlined"
            startIcon={<HomeOutlined />}
            onClick={() => navigate('/')}
            sx={{
              borderColor: theme.palette.divider,
              color:       'text.secondary',
              '&:hover': {
                borderColor: alpha(theme.palette.primary.main, 0.4),
                color:       'primary.main',
                bgcolor:     alpha(theme.palette.primary.main, 0.06),
              },
            }}
          >
            Back to home
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
