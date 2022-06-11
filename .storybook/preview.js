import "../packages/climbingweb/styles/globals.css"
import * as NextImage from 'next/image';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import {light, dark} from '../packages/climbingapp/src/theme';

const OriginalNextImage = NextImage.default;

const getthemes = () => {
  return [light, dark];
};

addDecorator(withThemesProvider(getthemes(), ThemeProvider));

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expended: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'galaxys5',
  },
};