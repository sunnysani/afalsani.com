import { Box, Typography, Button } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, ConstructionOutlined } from '@mui/icons-material'

export default function PortfolioPage() {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background blob */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, isDark ? 0.07 : 0.05)} 0%, transparent 60%)`,
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', textAlign: 'center', maxWidth: 460 }}>
        {/* Icon */}
        <Box
          sx={{
            width: 76,
            height: 76,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.secondary.main, isDark ? 0.12 : 0.09),
            border: `1px solid ${alpha(theme.palette.secondary.main, isDark ? 0.28 : 0.22)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
          }}
        >
          <ConstructionOutlined sx={{ fontSize: 34, color: 'secondary.main' }} />
        </Box>

        <Typography
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'secondary.main',
            display: 'block',
            mb: 2,
          }}
        >
          Coming Soon
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.9rem', sm: '2.6rem' },
            mb: 2,
            color: 'text.primary',
          }}
        >
          Under Development
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 5, lineHeight: 1.75 }}>
          The portfolio is being crafted. Check back soon for projects, case studies, and more.
        </Typography>

        <Button
          variant="outlined"
          startIcon={<HomeOutlined />}
          onClick={() => navigate('/')}
          sx={{
            borderColor: theme.palette.divider,
            color: 'text.secondary',
            '&:hover': {
              borderColor: alpha(theme.palette.primary.main, 0.4),
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.06),
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  )
}
