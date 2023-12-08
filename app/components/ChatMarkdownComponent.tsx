'use client'
import React, { useRef, useEffect, useState } from 'react';
import {
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  imagePlugin,
  tablePlugin,
  quotePlugin,
  headingsPlugin,
  listsPlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  ConditionalContents,
  ChangeCodeMirrorLanguage,
  InsertCodeBlock,
  DiffSourceToggleWrapper,
} from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css'

//this is another editor component, this one will be used specifically in the chat
//it needs to have a form with two elements:
//1. a text input
//2. a submit button
//I also need to pass it a handle submit function, input, and handle input change function

interface ChatEditorProps {
  handleSubmit: (e: any) => void,
  input: string,
  setInput: any,
  placeholder: string
}

export function BasicChatEditor({ handleSubmit, input, setInput, placeholder }: ChatEditorProps) {
  return (
    <form className="relative px-5" onSubmit={handleSubmit}>
      <textarea
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-full"
        name="message"
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
      />
      <button
        className="absolute right-6 bottom-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        type="submit"
      >
        Send
      </button>
    </form>
  )
}

export function MarkdownChatEditor({ handleSubmit, input, setInput, placeholder }: ChatEditorProps) {
  const originalMarkdown = input
  const ref = useRef<any>(input)

  function handleInputChange() {
    setInput(ref.current.getMarkdown())
  }

  function handleLocalSubmit(e: any) {
    e.preventDefault()
    setInput('')
    ref.current.setMarkdown('')
    handleSubmit(e)
  }

  return (
    <form className="relative px-5" onSubmit={handleLocalSubmit}>
      <textarea
        className="w-full h-24 hidden px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        name="message"
        rows={3}
        value={input}
        onChange={handleInputChange}
        placeholder="type a message"
      />
      <MDXEditor
        className="dark-theme"
        markdown={input}
        ref={ref}
        onChange={() => setInput(ref.current.getMarkdown())}
        plugins={[
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <CodeToggle />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
                <ListsToggle />
                <Separator />
                <ConditionalContents
                  options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { fallback: () => <InsertCodeBlock /> }
                  ]}
                />
              </DiffSourceToggleWrapper>
            ),
          }),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'txt', tsx: 'TypeScript' } }),
          diffSourcePlugin({ diffMarkdown: originalMarkdown, viewMode: 'rich-text' }),
          imagePlugin({
            imageUploadHandler: () => Promise.resolve('https://picsum.photos/200/300'),
            imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200'],
          }),
          tablePlugin(),
          quotePlugin(),
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
        ]}
      />
      <button
        className="absolute right-6 bottom-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        type="submit"
      >
        Send
      </button>
    </form>
  )
}

const dayPlannerOutline = `
| Time | Activity     |
| ---- | ------------ |
| 00   | sleep        |
| 01   | sleep        |
| 02   | sleep        |
| 03   | sleep        |
| 04   | read         |
| 05   | ride a bike  |
| 06   | sleep        |
| 07   | eat eggs     |
| 08   | work on ace  |
| 09   | work on ace  |
| 10   | study BJJ    |
| 11   | study BJJ    |
| 12   | BJJ          |
| 13   | BJJ          |
| 14   | nap          |
| 15   | nap          |
| 16   | nap          |
| 17   | work         |
| 18   | work         |
| 19   | BJJ          |
| 20   | BJJ          |
| 21   | sleep        |
| 22   | sleep        |
| 23   | sleep        |
`