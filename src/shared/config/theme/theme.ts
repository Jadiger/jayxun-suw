import {
  Button,
  colorsTuple,
  createTheme,
  Drawer,
  Input,
  Select,
  TextInput,
  Title,
} from '@mantine/core'

import titlseStyles from './title.module.css'
import buttonStyles from './button.classes.module.css'

export const theme = createTheme({
  // fontFamily: 'Inter, sans-serif',
  breakpoints: {
    xs: '0',
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '80em', // 1280pxf
  },
  colors: {
    primary: [
      '#e5f4ff',
      '#cfe4ff',
      '#9fc6fb',
      '#6ca6f7',
      '#428bf3',
      '#287af2',
      '#0D6CF2', //600
      '#0360d9',
      '#0055c3',
      '#0049ac',
    ],
    gray: [
      '#FAFAFA',
      '#F5F5F5',
      '#EEEEEE',
      '#E0E0E0',
      '#BDBDBD',
      '#9E9E9E',
      '#757575',
      '#616161',
      '#424242',
      '#212121',
    ],
    red: colorsTuple('#D45847'),
    green: colorsTuple('#5FB360'),
    orange: colorsTuple('#EEB12F'),
  },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'md',
        radius: '8px',
      },
      styles: {
        input: {
          height: '48px',
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        size: 'md',
        radius: '8px',
      },
      styles: {
        input: {
          height: '48px',
        },
      },
    }),

    PasswordInput: Input.extend({
      defaultProps: {
        size: 'md',
        radius: '8px',
      },
      styles: {
        input: {
          height: '48px',
        },
      },
    }),
    Button: Button.extend({
      defaultProps: {
        size: 'md',
        radius: '8px',
        color: 'var(--mantine-color-primary-6)',
      },
      styles: {
        root: {
          height: '48px',
        },
      },
      classNames: {
        root: buttonStyles.root,
      },
    }),
    Title: Title.extend({
      classNames: titlseStyles,
    }),
    Drawer: Drawer.Content.extend({
      defaultProps: {
        styles: {
          content: {
            height: 'auto',
          },
        },
      },
    }),
  },
})
