'use client'
import { useEffect, useState } from 'react';
import { VscCommentDiscussion, VscFiles, VscSearch } from "react-icons/vsc";
import { GiAngelOutfit, GiDevilMask } from 'react-icons/gi';
import interact from 'interactjs';

export default function Layout({ children }: any) {

  const [selectedSidebar, setSelectedSidebar] = useState<string>('notes');

  useEffect(() => {
    interact('.resizable')
    .resizable({
      edges: { right: true },
      listeners: {
        move: function (event) {
          let { x, y } = event.target.dataset
  
          x = (parseFloat(x) || 0) + event.deltaRect.left
          y = (parseFloat(y) || 0) + event.deltaRect.top
  
          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`
          })
  
          Object.assign(event.target.dataset, { x, y })
        }
      }
    })
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col"
    >
      <header
        className="h-8 w-full border border-gray-500 flex items-center justify-center"
      >
        <GiAngelOutfit size='1.5em' />
        - Two Dameons Andon -
        <GiAngelOutfit size='1.5em' />
      </header>
      <div
        className="flex-grow flex flex-row w-full"
      >
        <div
          className='h-full border border-gray-500 w-12 flex flex-col items-center'
        >
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            onClick={() => setSelectedSidebar('notes')}
          >
            <VscFiles size='1.5em' />
          </a>
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            onClick={() => setSelectedSidebar('search')}
          >
            <VscSearch size='1.5em' />
          </a>
          <a
            className='p-2 hover:bg-gray-500 rounded-full'
            onClick={() => setSelectedSidebar('chat')}
          >
            <VscCommentDiscussion size='1.5em' />
          </a>
        </div>
        <nav
          className="h-full border border-gray-500 resizable"
        >
          <PolyComponent type={selectedSidebar}/>
        </nav>
        <main>
          {children}
        </main>
      </div>

    </div>
  )
}

function PolyComponent({ type }: { type: string }) {
  return (
    <div
      className="h-full w-full"
    >
      {type}
    </div>
  )
}