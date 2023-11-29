'use client'

import {
  MDXEditor,
  ViewMode,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  directivesPlugin,
  codeMirrorPlugin,
  linkDialogPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  imagePlugin,
  sandpackPlugin,
  tablePlugin,
  BlockTypeSelect,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeToggle,
  CreateLink,
  DiffSourceToggleWrapper,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertImage,
  InsertSandpack,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  ShowSandpackInfo,
  SingleChoiceToggleGroup,
  Separator,
  Select,
  MultipleChoiceToggleGroup,
  DialogButton,
  ConditionalContents,
  ButtonWithTooltip,
  Button,
  ButtonOrDropdownButton,
  type MDXEditorMethods,
  type MDXEditorProps,
  codeBlockPlugin,
  CodeMirrorEditor,
} from "@mdxeditor/editor";

// Replace 'library-name' with the actual library name
import '@mdxeditor/editor/style.css'

import { FC } from 'react'

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs. 
*/
const Editor: FC<EditorProps> = ({ markdown, editorRef }) => {
  const originalMarkdown = markdown
  return (
    <div
      className="bg-gray-800 h-full w-98-percent m-auto overflow-y-auto "
    >
      <MDXEditor
        className="dark-theme px-3"
        ref={editorRef}
        markdown={markdown}
        plugins={[
          // Example Plugin Usage
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
                    {
                      fallback: () => (<>
                        <InsertCodeBlock />
                      </>)
                    }
                  ]}
                />
              </DiffSourceToggleWrapper>
            )
          }),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'js' }),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS', txt: 'txt', tsx: 'TypeScript' } }),
          diffSourcePlugin({ diffMarkdown: originalMarkdown, viewMode: 'rich-text' }),
          imagePlugin({
            imageUploadHandler: () => {
              return Promise.resolve('https://picsum.photos/200/300')
            },
            imageAutocompleteSuggestions: [
              'https://picsum.photos/200/300',
              'https://picsum.photos/200',
            ]
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
    </div>

  )
}

export default Editor