# @node-libraries/scaffold

## install

`npm -g install @node-libraries/scaffold`

## description

Create a canned file based on a template.  
Templates can also be placed on github.

## usage

```
Usage: scaffold [options] [command]

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  create [options] <name>  Create component
      -t, --templatePath <templatePath>  TemplatePath or GitHub-Url(default:./templates)
      -o, --outputPath <outputPath>      OutputPath (default:./src/components)
  help
```

Remote commands refer to the value of `supabase/.env.remote`

## Template Example(Example of using React and Storybook)

- The extension must be `.template`.  
  extension to prevent automatic formatting by the editor.
- The following strings will be replaced  
  `{{{NAME}}}` -> ComponentName  
  `{{{PATH}}}` -> ComponentPath

### File Examples

<https://github.com/node-libraries/scaffold/tree/master/templates>

- templates/index.ts.template

```tsx
export * from "./{{{NAME}}}";
```

- templates/{{{NAME}}}.module.scss.template

```tsx
.root {
}
```

- templates/{{{NAME}}}.tsx.template

```tsx
import React, { FC } from 'react';
import styled from './{{{NAME}}}.module.scss';

interface Props {}

/**
 * {{{NAME}}}
 *
 * @param {Props} { }
 */
export const {{{NAME}}}: FC<Props> = ({}) => {
  return <div className={styled.root}>Test</div>
};
```

- templates/{{{NAME}}}.stories.tsx.template

```tsx
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { {{{NAME}}} } from './{{{NAME}}}';

const meta: ComponentMeta<typeof {{{NAME}}}> = {
  title: 'Components/{{{PATH}}}{{{NAME}}}',
  component: {{{NAME}}},
  parameters: {
    //  nextRouter: { asPath: '/' },
  },
  args: {},
};
export default meta;

export const Primary: ComponentStoryObj<typeof {{{NAME}}}> = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText('Test')
    ).toBeInTheDocument();
  },
}
```

## Command Usage

- templates -> src/components/Sample01

```sh
scaffold create Sample01
```

- templates -> src/components/Samples/Sample01

```sh
scaffold create Samples/Sample01
```

- template -> src/component/Samples/Sample01

```sh
scaffold create -t template -o src/component Samples/Sample01
```

- GitHub -> src/component/Samples/Sample01

```sh
scaffold create -t https://github.com/node-libraries/scaffold/tree/master/templates/storybook6 -o src/component Samples/Sample01
```
