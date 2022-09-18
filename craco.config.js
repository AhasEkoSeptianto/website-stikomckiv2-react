const { getLoader, loaderByName, getLoaders } = require("@craco/craco");


module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => { 
      
      if (env === 'development') {
        // your overridden `style-loader`
        const overrideOptions = {
          test: /plugin\.css$/,
          loaders: ['style-loader', 'css'],
        };

        // override `style-loader`
        const { isFound, match } = getLoaders(webpackConfig, loaderByName('style-loader'));

        if (isFound) {
          match.parent[match.index] = overrideOptions;
        }
      }

      return webpackConfig; 
    },
  },
}