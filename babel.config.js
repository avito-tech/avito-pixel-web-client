module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, include: ['@babel/plugin-transform-classes'] }],
    '@babel/preset-typescript',
  ],
};