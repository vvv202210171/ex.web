module.exports = {
  // presets: [
  //   '@vue/cli-plugin-babel/preset',
  // ],
  presets: ['@vue/app'],
  env: {
    development: {
      plugins: ['dynamic-import-node'],
    },
  },
};
