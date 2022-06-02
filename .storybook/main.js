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
    config.module.rules.unshift({ 
      test: /\.svg$/,
      use: [{
        loader: '@svgr/webpack',
        options: {
          native: true,
        },
      }],
    });
    return config;
  },
};