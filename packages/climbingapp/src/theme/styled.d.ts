import 'styled-components';
// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: '#FFFFFF';
      black: '#121212';
      gray100: '#FAFAFA';
      gray200: '#F2F2F2';
      gray300: '#E6E6E6';
      gray400: '#BFBFBF';
      gray500: '#808080';
      gray600: '#666666';
      gray700: '#404040';
      gray800: '#333333';
      gray900: '#000000';

      orange500: '#FC7544';
      red500: '#FF483B';
      purple500: '#5953FF';
      purple600: '#433FBF';
      yellow500: '#FFDE3B';
    };
  }
}
