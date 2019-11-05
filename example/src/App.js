import React, { Component } from 'react';
import { ab, AbTestVariant } from 'react-ab-testing';

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
