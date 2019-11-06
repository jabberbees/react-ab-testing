# ab-react

> A simple React framework for A/B testing

[![NPM](https://img.shields.io/npm/v/ab-react.svg)](https://www.npmjs.com/package/ab-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save ab-react
```

## Usage

```jsx
import React, { Component } from 'react';
import { ab, AbTestVariant } from 'ab-react';

ab.configure()
  .addExperiment('hello-world')
  .addVariant("v1")
  .addVariant("v2")
  .addVariant("v3")
  .addVariant("v4")
  .done();

export default class App extends Component {
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
      </div>
    );
  }
}
```

## Inspirations

[Scoping A/B Test Code in React (Katie Garcia)](https://medium.com/expedia-group-tech/a-b-testing-and-the-cloak-of-invisibility-a-better-way-to-scope-variant-code-in-your-react-app-902a68a0c2c3)


## License

MIT © [jabberbees](https://github.com/jabberbees)
