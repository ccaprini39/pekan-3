import { VscCommentDiscussion, VscFiles, VscNewFile, VscRefresh, VscSearch } from "react-icons/vsc";

export default function NotesSidebar({ selectedSidebar, setSelectedSidebar }: any) {
  return (
    <nav
      className='h-full border border-gray-500 w-12 flex flex-col items-center'
    >
      <a
        className='p-2 hover:bg-gray-500 rounded-full'
        style={selectedSidebar !== 'notes' ? { opacity: "50%" } : {}}
        onClick={() => setSelectedSidebar('notes')}
      >
        <VscFiles size='1.5em' />
      </a>
      <a
        className='p-2 hover:bg-gray-500 rounded-full'
        style={selectedSidebar !== 'search' ? { opacity: "50%" } : {}}
        onClick={() => setSelectedSidebar('search')}
      >
        <VscSearch size='1.5em' />
      </a>
      <a
        className='p-2 hover:bg-gray-500 rounded-full'
        style={selectedSidebar !== 'chat' ? { opacity: "50%" } : {}}
        onClick={() => setSelectedSidebar('chat')}
      >
        <VscCommentDiscussion size='1.5em' />
      </a>
    </nav>
  )
}
