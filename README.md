# ab-react

> A simple React framework for A/B testing

[![NPM](https://img.shields.io/npm/v/@jabberbees/ab-react.svg)](https://www.npmjs.com/package/ab-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save ab-react
```

## Example

From [example/src/App.js](blob/master/example/src/App.js)

```jsx
// filename: App.js

import React, { Component } from 'react';
import { ab, AbTestVariant } from '@jabberbees/ab-react';

ab.configure()
  .addExperiment('hello-world')
  .addVariant("v1")
  .addVariant("v2").weighing(2)
  .addVariant("v3")
  .addVariant("v4")
  .addExperiment('zig-or-zag')
  .addVariant("zig")
  .addVariant("zag").forced()
  .done()
  .loadVariantMap("ab-map", window.localStorage)
  .randomiseVariants()
  .saveVariantMap("ab-map", window.localStorage);

export default class App extends Component {
  onResetVariants() {
    ab.removeSavedVariantMap("ab-map", window.localStorage);
    window.location.reload();
  }

  render() {
    return (
      <div>
        <AbTestVariant experiment='hello-world' variant='v1'>
          <p>Hello world! (v1)</p>
        </AbTestVariant>
        <AbTestVariant experiment='hello-world' variant='v2'>
          <p>Hello world! (v2)</p>
        </AbTestVariant>
        <AbTestVariant experiment='hello-world' variant='v3'>
          <p>Hello world! (v3)</p>
        </AbTestVariant>
        <AbTestVariant experiment='hello-world' variant='v4'>
          <p>Hello world! (v4)</p>
        </AbTestVariant>

        <AbTestVariant experiment='zig-or-zag' variant='zig'>
          <p>Zig</p>
        </AbTestVariant>
        <AbTestVariant experiment='zig-or-zag' variant='zag'>
          <p>Definitely Zag</p>
        </AbTestVariant>

        <button onClick={this.onResetVariants}>Reset variants</button>
      </div>
    );
  }
}
```

### How to run the provided example

* Open a shell window

```bash
cd path/to/ab-react
npm start
```

* Open another shell window

```bash
cd path/to/ab-react/example
npm start
```


* The example website should open in your favorite browser

## Inspirations

[Scoping A/B Test Code in React (Katie Garcia)](https://medium.com/expedia-group-tech/a-b-testing-and-the-cloak-of-invisibility-a-better-way-to-scope-variant-code-in-your-react-app-902a68a0c2c3)


## License

MIT © [jabberbees](https://github.com/jabberbees)
