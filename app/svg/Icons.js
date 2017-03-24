import camelCase from 'lodash-es/camelCase';

let icons = {}; // eslint-disable-line import/no-mutable-exports

// require.context doesn't work in test environments
if (process.env.NODE_ENV !== 'test') {
  const svgIcons = require.context('../svg/', true, /\.svg$/);

  const requireAll = (requireContext) => requireContext.keys().map(requireContext);

  icons = requireAll(svgIcons)
    .reduce((state, icon) => ({
      ...state,
      [camelCase(icon.slice(1))]: icon,
    }),
  {});
}

export default icons;
