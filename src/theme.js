import { createTheme, alpha } from '@mui/material/styles'

// Indigo primary + warm amber secondary — editorial, not AI-gradient
const INDIGO_DARK  = '#6B9AFF'   // periwinkle indigo for dark (lighter for contrast)
const INDIGO_LIGHT = '#2D55D4'   // deep indigo for light
const AMBER_DARK   = '#F5BD5A'   // golden amber for dark
const AMBER_LIGHT  = '#D97706'   // deep amber for light

export function buildTheme(mode) {
  const isDark  = mode === 'dark'
  const primary = isDark ? INDIGO_DARK  : INDIGO_LIGHT
  const amber   = isDark ? AMBER_DARK   : AMBER_LIGHT

  return createTheme({
    palette: {
      mode,
      primary: {
        main:          primary,
        light:         isDark ? '#92B5FF' : '#6B9AFF',
        dark:          isDark ? '#4878E8' : '#1A3FAA',
        contrastText:  '#fff',
      },
      secondary: {
        main:          amber,
        light:         isDark ? '#FAD07A' : '#F59E0B',
        dark:          isDark ? '#D4924A' : '#B45309',
        contrastText:  isDark ? '#1A1000' : '#fff',
      },
      background: {
        default: isDark ? '#0D0F16' : '#F4F5FA',
        paper:   isDark ? '#141924' : '#FFFFFF',
      },
      text: {
        primary:   isDark ? '#E6EAFF' : '#111827',
        secondary: isDark ? '#6B7799' : '#6B7280',
      },
      divider:  isDark ? 'rgba(255,255,255,0.07)' : 'rgba(17,24,39,0.09)',
      error:   { main: isDark ? '#F87171' : '#DC2626' },
      success: { main: isDark ? '#4ADE80' : '#16A34A' },
      warning: { main: isDark ? '#FBBF24' : '#D97706' },
    },

    typography: {
      fontFamily: '"DM Sans", system-ui, sans-serif',
      h1: { fontFamily: '"Outfit", sans-serif', fontWeight: 800, letterSpacing: '-0.04em' },
      h2: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '-0.03em' },
      h3: { fontFamily: '"Outfit", sans-serif', fontWeight: 700, letterSpacing: '-0.025em' },
      h4: { fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '-0.015em' },
      h5: { fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
      h6: { fontFamily: '"Outfit", sans-serif', fontWeight: 600 },
      subtitle1: { fontFamily: '"Outfit", sans-serif', fontWeight: 500 },
      button: {
        fontFamily:    '"DM Sans", sans-serif',
        fontWeight:    600,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      overline: {
        fontFamily:    '"DM Sans", sans-serif',
        letterSpacing: '0.1em',
        fontWeight:    600,
      },
    },

    shape: { borderRadius: 12 },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight:    600,
            letterSpacing: '0.01em',
            borderRadius:  8,
            transition:    'all 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          containedPrimary: {
            background: primary,
            color:      '#fff',
            boxShadow:  `0 2px 12px ${alpha(primary, 0.32)}`,
            '&:hover': {
              background: isDark ? '#92B5FF' : '#4878E8',
              boxShadow:  `0 4px 20px ${alpha(primary, 0.42)}`,
              transform:  'translateY(-1px)',
            },
            '&:active': {
              transform: 'scale(0.98)',
              boxShadow: `0 1px 6px ${alpha(primary, 0.25)}`,
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset':          { borderColor: isDark ? 'rgba(255,255,255,0.1)'  : 'rgba(17,24,39,0.12)' },
              '&:hover fieldset':    { borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(45,85,212,0.35)' },
              '&.Mui-focused fieldset': { borderColor: primary },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: primary },
          },
        },
      },

      MuiSelect: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline':         { borderColor: isDark ? 'rgba(255,255,255,0.1)'  : 'rgba(17,24,39,0.12)' },
            '&:hover .MuiOutlinedInput-notchedOutline':   { borderColor: isDark ? 'rgba(255,255,255,0.22)' : 'rgba(45,85,212,0.35)' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: primary },
          },
        },
      },

      MuiInputLabel: {
        styleOverrides: {
          root: { '&.Mui-focused': { color: primary } },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage:   'none',
            backgroundColor:   isDark ? '#141924' : '#FFFFFF',
            border:            isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(17,24,39,0.09)',
          },
        },
      },

      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },

      MuiChip: {
        styleOverrides: {
          root: { fontFamily: '"DM Sans", sans-serif', fontWeight: 500 },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': { backgroundColor: alpha(primary, 0.07) },
            '&.Mui-selected': {
              backgroundColor: alpha(primary, 0.11),
              '&:hover':       { backgroundColor: alpha(primary, 0.16) },
            },
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#1E2638' : '#111827',
            border:          isDark ? '1px solid rgba(255,255,255,0.1)' : 'none',
            fontSize:        '0.74rem',
            fontFamily:      '"DM Sans", sans-serif',
            borderRadius:    6,
            padding:         '5px 10px',
          },
        },
      },

      MuiAlert: {
        styleOverrides: { root: { fontFamily: '"DM Sans", sans-serif' } },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage:   'none',
            backgroundColor:   isDark ? '#141924' : '#FFFFFF',
            border:            isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(17,24,39,0.1)',
          },
        },
      },
    },
  })
}
