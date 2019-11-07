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
