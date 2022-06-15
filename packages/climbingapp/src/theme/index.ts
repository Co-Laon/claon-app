import { DefaultTheme } from 'styled-components';
export const light: DefaultTheme = {
  current: 'light',
  color: {
    text: '#000000',
    mainBg: '#ffffff',
  },
  name: 'light',
  textColor: '#ffff00',
};

export const dark: DefaultTheme = {
  current: 'dark',
  color: {
    text: '#ffffff',
    mainBg: '#000000',
  },
  name: 'dark',
  textColor: '#000000',
};
