import "../packages/climbingweb/styles/globals.css"
import * as NextImage from 'next/image';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const OriginalNextImage = NextImage.default;

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
  backgrounds: {
    values: [{name: 'default', value: '#fffff4'}, {name: 'black', value: '#000000'}],
  }
};