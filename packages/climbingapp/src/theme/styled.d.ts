import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    current: string;
    color: {
      text: string;
      mainBg: string;
    };
  }
}
