# ab-react

> A simple React framework for A/B testing

[![NPM](https://img.shields.io/npm/v/@jabberbees/ab-react.svg)](https://www.npmjs.com/package/@jabberbees/ab-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Motivation

Provide a simple A/B testing framework to React developers with the following properties:

* easy to setup with a Fluent API
* deterministic: experiments' variants are chosen once, at application startup
* the map of chosen variants can be queried at any time (for analytics or logging for example)
* the map of chosen variants can be cached (LocalStorage for example)
* an experiment variant can be represented by multiple React fragments
* an experiment variant can be forced when the experiment is conclusive, without necessarily cleaning up other A/B variants
* experiment variants can have different weights
* the framework helps clean up past experiments (in LocalStorage for example)
* tested (TDD)


## Install

```bash
npm install --save ab-react
```

## How to configure experiments and variants

Configuration is done by:
* importing ab singleton
* adding experiments and variants between configure and done function calls

```jsx
import { ab } from '@jabberbees/ab-react';

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
```

## How to initialise chosen variants

Chosen variants are determined by ab's "variant map".

The framework provides several functions to manipulate the variant map.
All variant map functions can be chained in a Fluent way.

clearVariantMap() clears the variant map.

setVariantMap(variantMap) sets the variant map from an object containing experiment names as keys and variant names as value.

loadVariantMap(key, storage) loads the variant map from at the given key in storage. storage defaults to window.localStorage. Forced variants have priority over loaded variants.

saveVariantMap(key, storage) saves the variant map to the given key in storage.

removeSavedVariantMap(key, storage) removes the variant map stored at the given key in storage.

randomiseVariants() chooses a variant randomly for each experiment which is not already initialised in the variant map.


```jsx
import { ab } from '@jabberbees/ab-react';

ab.loadVariantMap("ab-map", window.localStorage)
  .randomiseVariants()
  .saveVariantMap("ab-map", window.localStorage);
```

## How to implement React variants

React variants are implemented by:
* importing AbTestVariant component
* wrapping variants JSX code inside a <AbTestVariant> component

```jsx
import React, { Component } from 'react';
import { AbTestVariant } from '@jabberbees/ab-react';

export default class App extends Component {
  render() {
    return (
      <div>
        <AbTestVariant experiment='zig-or-zag' variant='zig'>
          <p>Zig</p>
        </AbTestVariant>
        <AbTestVariant experiment='zig-or-zag' variant='zag'>
          <p>Definitely Zag</p>
        </AbTestVariant>
      </div>
    );
  }
}
```

## Example

From [example/src/App.js](example/src/App.js)

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
