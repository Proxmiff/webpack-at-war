# webpack-at-war

## Usage
```
const WarPlugin = require('webpack-at-war');
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
