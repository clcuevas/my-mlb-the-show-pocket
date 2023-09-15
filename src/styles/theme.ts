import { createTheme } from '@mui/material'

import Color from './Color'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: Color.PRIMARY_MAIN,
      light: Color.PRIMARY_LIGHT,
      dark: Color.PRIMARY_DARK,
      contrastText: Color.WHITE,
    },
    secondary: {
      main: Color.SECONDARY_MAIN,
      light: Color.SECONDARY_LIGHT,
      dark: Color.SECONDARY_DARK,
      contrastText: Color.WHITE,
    },
    info: {
      main: Color.INFO_MAIN,
      light: Color.INFO_LIGHT,
      dark: Color.INFO_DARK,
      contrastText: Color.WHITE,
    },
    error: {
      main: Color.ERROR_MAIN,
      light: Color.ERROR_LIGHT,
      dark: Color.ERROR_DARK,
      contrastText: Color.WHITE,
    },
    warning: {
      main: Color.WARNING_MAIN,
      light: Color.WARNING_LIGHT,
      dark: Color.WARNING_DARK,
      contrastText: Color.WHITE,
    },
    success: {
      main: Color.SUCCESS_MAIN,
      light: Color.SUCCESS_LIGHT,
      dark: Color.SUCCESS_DARK,
      contrastText: Color.WHITE,
    },
  },
})

export default theme
