# webpack-at-war-plugin

## Usage
```
const WarPlugin = require('webpack-at-war-plugin');
const package = require('./package.json');

plugins: [
  ...
  new WarPlugin({
    bundleName: `${ package.name.toLowerCase() }.war`,
    implementationTitle: package.name.toLowerCase(),
    implementationVersion: package.version,
  }),
]
```
