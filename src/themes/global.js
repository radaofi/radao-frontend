import fonts from "./fonts";

const breakpointValues = {
  xs: 0,
  sm: 596,
  md: 800,
  lg: 1000,
  xl: 1333,
};

// replace above with this later
// const breakpointValues = {
//   mobile: 590,
//   tablet: 970,
//   browser: 1333,
// };

/**
 * will remove opacity from rgbaString when backdrop-filter is not supported
 * @param {String} rgbaString should be the rgba string
 * @returns modified rgbaString
 */
export const handleBackdropFilter = rgbaString => {
  const supported = CSS.supports("(-webkit-backdrop-filter: none)") || CSS.supports("(backdrop-filter: none)");
  if (!supported) {
    // make the opacity == 0.9;
    rgbaString = rgbaString.replace(/[\d\.]+\)$/g, "0.9)");
  }
  return rgbaString;
};

const commonSettings = {
  direction: "ltr",
  typography: {
    fontSize: 16,
    fontFamily: "Monument Extended",
    h1: {
      fontSize: "3.3rem",
    },
    h2: {
      fontSize: "2.3rem",
      letterSpacing: "1.3px",
    },
    h3: {
      fontSize: "1.75rem",
    },
    h4: {
      fontSize: "1.5rem",
    },
    h5: {
      fontSize: "1.25rem",
      letterSpacing: "0.4px",
    },
    h6: {
      fontSize: "1rem",
    },
    body1: {
      fontFamily: "Epilogue",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: "1.4rem",
    },
    body2: {
      fontFamily: "Epilogue",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1,
      lineHeight: "1.4rem",
    },
    button: {
      fontFamily: "Epilogue",
      textTransform: "none",
      fontSize: "1rem",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": fonts,
        breakpoints: { values: breakpointValues },
        body: {
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiToolbar: {
      root: {
        justifyContent: "flex-end",
      },
    },
    MuiPaper: {
      root: {
        // backdropFilter: "blur(33px)",
        "&.ohm-card": {
          padding: "20px 30px 30px 30px",
          maxWidth: "833px",
          width: "97%",
          marginBottom: "1.8rem",
          overflow: "hidden",
        },
        "&.ohm-menu": {
          padding: "22px 0px",
          margin: "0px",
        },
        "&.ohm-chart-card": {
          padding: "20px 0px",
          whiteSpace: "nowrap",
          maxWidth: "700px",
          width: "97%",
          marginBottom: "1.8rem",
        },
      },
    },
    MuiContainer: {
      root: {
        backgroundColor: "transparent",
        flexGrow: 1,
      },
    },
    MuiLink: {
      root: {
        textUnderlineOffset: ".23rem",
        cursor: "pointer",
        "&:hover": {
          textDecoration: "none",
          underline: "none",
        },
      },
    },
    MuiTable: {
      root: {
        margin: "10px 0px",
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: 0,
        fontSize: "1rem",
      },
      head: {
        fontSize: "0.8rem",
        color: "#999999",
      },
    },
    MuiDrawer: {
      root: {
        width: "280px",
        flexShrink: 0,
      },
      paper: {
        width: "inherit",
        // backdropFilter: "blur(33px)",
        backgroundColor: "inherit",
        padding: 0,
        zIndex: 7,
      },
    },
    MuiBackdrop: {
      root: {
        backdropFilter: "blur(15px)",
        zIndex: 0,
      },
    },
    MuiToggleButton: {
      root: {
        border: 0,
        borderRadius: "5px",
        margin: "8px",
        padding: "10px",
      },
    },
    MuiButton: {
      root: {
        borderRadius: "0",
        textTransform: "none",
        textDecoration: "none",
        whiteSpace: "nowrap",
        minWidth: "max-content",
        maxHeight: "42px",
        fontWeight: "600",
      },
      containedPrimary: {
        border: 0,
      },
      containedSecondary: {},
      outlinedPrimary: {
        padding: "9px 20px",
      },
      outlinedSecondary: {
        textTransform: "none",
        textDecoration: "none",
        padding: "9px 20px",
      },
      text: {
        "&:hover": {
          backgroundColor: "#00000000",
        },
      },
      textSecondary: {
        textTransform: "none",
        textDecoration: "none",
        padding: "2px 2px",
        "&:hover": {
          backgroundColor: "#00000000",
        },
      },
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          backgroundColor: "#00000000",
        },
      },
    },
    MuiInputBase: {
      root: {
        height: "43px",
        padding: "5px",
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: "translate(16px, 14px) scale(1)",
      },
    },
    MuiTabs: {
      root: {
        minHeight: "40px",
        height: "40px",
      },
    },
    MuiTab: {
      root: {
        minWidth: "min-content !important",
        padding: "0px",
        margin: "0px 10px",
        fontWeight: 400,
        fontSize: "1rem",
        fontStyle: "normal",
        lineHeight: "24px",
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
    MuiButton: {
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
    },
    MuiTextButton: {
      disableFocusRipple: true,
      disableRipple: true,
    },
    MuiPaper: {
      elevation: 0,
    },
    MuiTypograph: {
      gutterBottom: true,
    },
    MuiLink: {
      underline: "none",
    },
    MuiSvgIcon: {
      viewBox: "0 0 20 20",
      fontSize: "small",
    },
    MuiBackdrop: {
      transitionDuration: 300,
    },
    MuiPopover: {
      transitionDuration: 300,
    },
  },
};

export default commonSettings;
