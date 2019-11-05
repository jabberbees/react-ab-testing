import React, { Component } from 'react';
import { ab, AbTestVariant } from 'react-ab-testing';

ab.configure()
  .addExperiment('best-tagline')
  .addVariant("v1")
  .addVariant("v2")
  .addVariant("v3")
  .addVariant("v4")
  .done();

export default class App extends Component {

  render() {
    return (
      <div>
        <AbTestVariant experiment='best-tagline' variant='v1'>
          <p>Hello world! (v1)</p>
        </AbTestVariant>
        <AbTestVariant experiment='best-tagline' variant='v2'>
          <p>Hello world! (v2)</p>
        </AbTestVariant>
        <AbTestVariant experiment='best-tagline' variant='v3'>
          <p>Hello world! (v3)</p>
        </AbTestVariant>
        <AbTestVariant experiment='best-tagline' variant='v4'>
          <p>Hello world! (v4)</p>
        </AbTestVariant>
      </div>
    );
  }
}
