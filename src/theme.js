import { createTheme, alpha } from '@mui/material/styles'

// Royal Blue palette — warm, trustworthy, human-friendly
const BLUE_DARK = '#6B9AFF'    // royal blue for dark mode (lighter for contrast)
const BLUE_LIGHT = '#2D55D4'   // royal blue for light mode (deeper)
const VIOLET_DARK = '#B39DFA'  // soft violet accent for dark
const VIOLET_LIGHT = '#7C5CF6' // deeper violet for light

export function buildTheme(mode) {
  const isDark = mode === 'dark'
  const primary = isDark ? BLUE_DARK : BLUE_LIGHT
  const secondary = isDark ? VIOLET_DARK : VIOLET_LIGHT

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primary,
        light: isDark ? '#92B5FF' : '#6B9AFF',
        dark: isDark ? '#4878E8' : '#1A3FAA',
        contrastText: '#fff',
      },
      secondary: {
        main: secondary,
        light: isDark ? '#C8B5FC' : '#A78BFA',
        dark: isDark ? '#8B6EF0' : '#5B3ED4',
        contrastText: '#fff',
      },
      background: {
        default: isDark ? '#141820' : '#F2F5FF',
        paper: isDark ? '#1E2332' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#E6EAFF' : '#1A2040',
        secondary: isDark ? '#7A86B0' : '#5A6490',
      },
      divider: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(26,32,64,0.1)',
      error: { main: isDark ? '#F87171' : '#DC2626' },
      success: { main: isDark ? '#4ADE80' : '#16A34A' },
      warning: { main: isDark ? '#FBBF24' : '#D97706' },
    },
    typography: {
      fontFamily: '"DM Sans", sans-serif',
      h1: { fontFamily: '"Sora", sans-serif', fontWeight: 800, letterSpacing: '-0.03em' },
      h2: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h4: { fontFamily: '"Sora", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
      h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
      subtitle1: { fontFamily: '"Sora", sans-serif', fontWeight: 500 },
      button: { fontFamily: '"DM Sans", sans-serif', fontWeight: 600, textTransform: 'none' },
      overline: { fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em', fontWeight: 600 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em', borderRadius: 10 },
          containedPrimary: {
            background: isDark
              ? `linear-gradient(135deg, #6B9AFF, #4878E8)`
              : `linear-gradient(135deg, #2D55D4, #1A3FAA)`,
            color: '#fff',
            boxShadow: `0 2px 12px ${alpha(primary, 0.3)}`,
            '&:hover': {
              background: isDark
                ? `linear-gradient(135deg, #92B5FF, #6B9AFF)`
                : `linear-gradient(135deg, #4878E8, #2D55D4)`,
              boxShadow: `0 4px 20px ${alpha(primary, 0.45)}`,
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(26,32,64,0.18)' },
              '&:hover fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(45,85,212,0.4)' },
              '&.Mui-focused fieldset': { borderColor: primary },
            },
            '& .MuiInputLabel-root.Mui-focused': { color: primary },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(26,32,64,0.18)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(45,85,212,0.4)' },
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
            backgroundImage: 'none',
            backgroundColor: isDark ? '#1E2332' : '#FFFFFF',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(26,32,64,0.1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiChip: {
        styleOverrides: { root: { fontFamily: '"DM Sans", sans-serif', fontWeight: 500 } },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            '&:hover': { backgroundColor: alpha(primary, 0.08) },
            '&.Mui-selected': {
              backgroundColor: alpha(primary, 0.12),
              '&:hover': { backgroundColor: alpha(primary, 0.18) },
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? '#2A3050' : '#1A2040',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(26,32,64,0.15)',
            fontSize: '0.75rem',
            fontFamily: '"DM Sans", sans-serif',
          },
        },
      },
      MuiAlert: {
        styleOverrides: { root: { fontFamily: '"DM Sans", sans-serif' } },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            backgroundColor: isDark ? '#1E2332' : '#FFFFFF',
            border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(26,32,64,0.12)',
          },
        },
      },
    },
  })
}
