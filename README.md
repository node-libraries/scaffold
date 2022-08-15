# scaffold

## description

Create a canned file based on a template.

## usage

```
Usage: scaffold [options] [command]

Options:
  -V, --version            output the version number
  -h, --help               display help for command

Commands:
  create [options] <name>  Create component
      -t, --templatePath <templatePath>  TemplatePath (default:./templates)
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

- templates/index.tsx.template

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
import React, { FC } from 'react'
import styled from './{{{NAME}}}.module.scss'

interface Props {}

/**
 * {{{NAME}}}
 *
 * @param {Props} { }
 */
export const {{{NAME}}}: FC<Props> = ({}) => {
  return <div className={styled.root}>Sample</div>
}
```

- templates/{{{NAME}}}.tsx.template

```tsx
import React from 'react'
import { {{{NAME}}} } from '.'

const StoryInfo = {
  title: 'Components/{{{PATH}}}{{{NAME}}}',
  component: {{{NAME}}}
}
export default StoryInfo

export const Primary = (args: Parameters<typeof {{{NAME}}}>[0]) => (
  <>
    <{{{NAME}}} {...args}></{{{NAME}}}>
  </>
)
Primary.args = {} as Parameters<typeof {{{NAME}}}>[0]

Primary.parameters = {}
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
