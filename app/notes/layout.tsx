'use client'

import { useEffect, useState } from 'react';

import { GiAngelOutfit, GiDevilMask } from 'react-icons/gi';
import { ModeToggle } from '../components/ModeToggle';
import { useLocalStorage } from '@mantine/hooks';
import NotesSidebar from './SideNav';
import NotesTray from './NotesTray';
import FullScreenToggle from '@/components/ui/FullScreen';

export default function Layout({ children }: any) {

  const [selectedSidebar, setSelectedSidebar] = useLocalStorage<string>({ key: 'selectedSidebar', defaultValue: 'notes' });
  const [notes, setNotes] = useLocalStorage<any[]>({ key: 'notes', defaultValue: [] });
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <div
      className="h-screen w-screen flex flex-col"
    >
      <header
        className="h-12 w-full border border-gray-500 flex items-center justify-between"
      >
        <div></div>
        <div
          className='flex items-center justify-center'
        >
          <GiAngelOutfit size='1.5em' />
          - Two Dameons Andon -
          <GiDevilMask size='1.5em' />
        </div>
        <div
          className='flex items-center justify-center'
        >
          <ModeToggle />
          <FullScreenToggle />
        </div>

      </header>
      <div
        className="flex-grow flex flex-row w-full h-full max-h-full overflow-auto"
      >
        <NotesSidebar selectedSidebar={selectedSidebar} setSelectedSidebar={setSelectedSidebar} />
        <div
          className="h-full w-full border border-gray-500"
        >
          <NotesTray selectedSidebar={selectedSidebar} setSelectedSidebar={setSelectedSidebar} >
            {children}
          </NotesTray>
        </div>
      </div>
    </div>
  )
}