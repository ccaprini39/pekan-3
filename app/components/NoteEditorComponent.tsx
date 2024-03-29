import React, { FC, useEffect, useState } from 'react';
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
  linkDialogPlugin,
  linkPlugin,
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
import { getNoteById } from '../notes/server-functions/load-notes';
import { updateNote } from '../notes/server-functions/create-note';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDidUpdate, useIdle, useInterval } from '@mantine/hooks';


export default function NoteEditorComponent(
  { noteId, deleteNote }: { noteId: string, deleteNote: any }) {
  const [noteContent, setNoteContent] = useState<string>('')
  const [originalMarkdown, setOriginalMarkdown] = useState<string>('')
  const [noteTitle, setNoteTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [saving, setSaving] = useState<boolean>(false)
  const [currentRefValue, setCurrentRefValue] = useState<MDXEditorMethods | null>(null)
  const ref = React.useRef<MDXEditorMethods | null>(null)
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => handleSave(), 30000);


  const idle = useIdle(1000)

  useDidUpdate(() => { 
    if(!idle){
      interval.start()
    } else {
      handleSave()
      interval.stop()
    }
  }, [idle])


  useInterval

  useEffect(() => {
    async function getNoteContent() {
      setLoading(true)
      const data = await getNoteById(noteId)
      if (!data) {
        return
      }
      setSelectedNote(data)
      setNoteTitle(data.Title)
      setNoteContent(data.Content)
      setOriginalMarkdown(data.Content)
      setLoading(false)
    }
    getNoteContent()
  }, [])

  useEffect(() => {
    function updateSelectedNote() {
      setSelectedNote({
        ...selectedNote,
        Content: noteContent,
        Title: noteTitle
      })
    }
    updateSelectedNote()
  }, [])

  async function handleSave(e?: any) {
    e?.preventDefault()
    setSaving(true)
    await updateNote({
      ...selectedNote,
      Content: ref.current?.getMarkdown(),
      Title: noteTitle
    })
    setSaving(false)
  }

  async function handleDeleteButtonClicked(e: any) {
    e.preventDefault()
    const note = await deleteNote(selectedNote.id)
    setNoteContent('')
    setNoteTitle('')
    setSelectedNote(
      {
        id: '',
        Content: '',
        Title: ''
      }
    )
  }

  function MenuBar() {
    const [localNoteTitle, setLocalNoteTitle] = useState(noteTitle);
    // thing that looks like a menu bar with the note title and a save button
    return (
      <div className="flex justify-between items-center w-98-percent h-10 m-2 bg-base-300">
        <div className="flex justify-start items-center">
          <Input
            type="text"
            className="input input-bordered input-sm"

            placeholder="Title"
            value={localNoteTitle}
            onChange={(e) => setLocalNoteTitle(e.target.value)}
            onBlur={() => setNoteTitle(localNoteTitle)}
          />
        </div>
        <div className="flex justify-end items-center">
          <Button
            variant={'outline'}
            disabled={saving}
            size={'sm'}
            onClick={handleSave}
          >
            Save
          </Button>
          <Button
            variant={'outline'}
            size={'sm'}
            onClick={handleDeleteButtonClicked}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="h-full w-full max-h-full max-w-full"
      // style={idle ? { filter: 'blur(2px)' } : {}}
    >
      {loading ?
        <div className="flex justify-center items-center h-full w-full max-h-full max-w-full">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
        </div>
        :
        <div className="textarea textarea-bordered h-full max-h-full w-98-percent m-auto overflow-y-auto rounded-lg">
          <MenuBar />
          <MDXEditor
            className="dark-theme"
            markdown={noteContent}
            ref={ref}
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
              linkDialogPlugin(),
              linkPlugin(),
              quotePlugin(),
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
          />
        </div>
      }
    </div>
  );
};