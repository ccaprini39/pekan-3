import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const EditorComp = dynamic(() => import('./EditorComponent'), { ssr: false })

const markdown = `
# Hello world!

## Check the EditorComponent.tsx file for the code .

here is a thing

here is a list:

* item 1
* item 2
* item 3



here is a list:

1. item 1
2. item 2
3. item 3



here is a list:

* [ ] item 1
* [ ] item 2
* [ ] item 3


* [ ] something&#x20;

| column 1 | column 2 | column 3 |
| -------- | -------- | -------- |
| row 1    | data     |          |
| row 2    | data     | data     |
`

export default function BasicEditor() {
  return (
    <EditorComp markdown={markdown} />
  )
}

export function BasicEditorWithInput({ givenMarkdown }: { givenMarkdown: string }) {
  return (
    <EditorComp markdown={givenMarkdown} />
  )
}