module.exports = {
  plugins: [
    ['module:react-native-dotenv'],
    ['module-resolver', {alias: {'@': './src/'}, root: ['./']}],
  ],
  presets: ['module:@react-native/babel-preset'],
};
