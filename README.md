# react-ab-testing

> A simple React framework for A/B testing

[![NPM](https://img.shields.io/npm/v/react-ab-testing.svg)](https://www.npmjs.com/package/react-ab-testing) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Install

```bash
npm install --save react-ab-testing
```

## Usage

```jsx
import React, { Component } from 'react'
import { Wizard } from "react-ab-testing";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

const MyForm = ({ onSubmit }) => (
  <Wizard
    initialValues={{
      firstName: "",
      lastName: "",
      email: "",
      favoriteColor: "",
      choice: ""
    }}
    onSubmit={onSubmit}
  >
    <Wizard.Page>
      <FirstPage />
    </Wizard.Page>
    <Wizard.Page>
      <SecondPage />
    </Wizard.Page>
  </Wizard>
);

export default MyForm;
```

## Inspirations

[Scoping A/B Test Code in React (Katie Garcia)](https://medium.com/expedia-group-tech/a-b-testing-and-the-cloak-of-invisibility-a-better-way-to-scope-variant-code-in-your-react-app-902a68a0c2c3)


## License

MIT © [jabberbees](https://github.com/jabberbees)
