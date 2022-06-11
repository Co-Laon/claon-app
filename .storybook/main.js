
const path = require("path");
module.exports = {
  stories: [
    "../packages/climbingapp/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../packages/climbingweb/**/*.stories.@(js|jsx|ts|tsx|mdx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "storybook-addon-styled-component-theme/dist/preset",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        }
      }
    }
  ],
  framework: '@storybook/react',
  /* babel: async (options) => {
    options.plugins.push("babel-plugin-inline-react-svg");
    return options;
  }, */
  webpackFinal: async config => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.unshift({ 
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
}; 