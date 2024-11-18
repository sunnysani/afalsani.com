// This file is included at GlobalUIProvider

import { createTheme } from "@mui/material";
import StyleConstant from "./utils/common/StyleConstant.Common";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    Title1Bold: React.CSSProperties;
    Title1Regular: React.CSSProperties;
    Title2Bold: React.CSSProperties;
    Title2Regular: React.CSSProperties;
    Title3Bold: React.CSSProperties;
    Title3Regular: React.CSSProperties;
    Title4Bold: React.CSSProperties;
    Title4Regular: React.CSSProperties;
    body: React.CSSProperties;
    bodyLongHeight: React.CSSProperties;
    caption: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    Title1Bold: React.CSSProperties;
    Title1Regular: React.CSSProperties;
    Title2Bold: React.CSSProperties;
    Title2Regular: React.CSSProperties;
    Title3Bold: React.CSSProperties;
    Title3Regular: React.CSSProperties;
    Title4Bold: React.CSSProperties;
    Title4Regular: React.CSSProperties;
    body: React.CSSProperties;
    bodyLongHeight: React.CSSProperties;
    caption: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    Title1Bold: true;
    Title1Regular: true;
    Title2Bold: true;
    Title2Regular: true;
    Title3Bold: true;
    Title3Regular: true;
    Title4Bold: true;
    Title4Regular: true;
    body: true;
    bodyLongHeight: true;
    caption: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsVariantOverrides {
    regular: true;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: StyleConstant.MAIN_BLUE_100,
    },
    secondary: {
      main: StyleConstant.BLACK,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: StyleConstant.BG,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: StyleConstant.BG,
          boxShadow: "0 4px 8px rgba(62,62,62,0.2)",
          borderRadius: "8px",
          padding: "16px 32px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: StyleConstant.MAIN_BLUE_80,
          color: StyleConstant.WHITE,
          padding: "6px 12px",
          textTransform: "unset",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          fontSize: 10,
          borderRadius: "2px",
          fontWeight: 700,
          height: 24,
          outlineWidth: "1px",
          "& .MuiSvgIcon-root": {
            fontSize: 12,
          },
          "& .MuiChip-label": {
            display: "flex",
            alignItems: "center",
          },
        },
        label: {
          padding: "0 8px",
        },
        sizeSmall: {
          height: 16,
          "& .MuiChip-label": {
            padding: "0 4px",
          },
        },
      },
      variants: [
        {
          props: { variant: "regular" },
          style: {
            background: "transparent",
            color: StyleConstant.MAIN_BLUE_80,
            "& .MuiSvgIcon-root": {
              color: StyleConstant.WHITE,
            },
          },
        },
      ],
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          Title1Bold: "h2",
          Title1Regular: "h2",
          Title2Bold: "h3",
          Title2Regular: "h3",
          Title3Bold: "h4",
          Title3Regular: "h4",
          Title4Bold: "h4",
          Title4Regular: "h4",
          body: "p",
          caption: "p",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Helvetica", "Helvetica Oblique"].join(","),
    Title1Bold: {
      fontSize: 24,
      fontWeight: 700,
    },
    Title1Regular: {
      fontSize: 24,

      fontWeight: 400,
    },
    Title2Bold: {
      fontSize: 20,
      fontWeight: 700,
    },
    Title2Regular: {
      fontSize: 20,
      fontWeight: 400,
    },
    Title3Bold: {
      fontSize: 16,
      fontWeight: 700,
    },
    Title3Regular: {
      fontSize: 16,
      fontWeight: 400,
    },
    Title4Bold: {
      fontSize: 14,
      fontWeight: 700,
    },
    Title4Regular: {
      fontSize: 14,
      fontWeight: 400,
    },
    body: {
      fontSize: 14,
      fontWeight: 400,
    },
    bodyLongHeight: {
      fontSize: 14,
      lineHeight: 24,
      fontWeight: 400,
    },
    caption: {
      fontFamily: "Helvetica Oblique",
      fontSize: 12,
      fontWeight: 400,
    },
  },
});

export default theme;
