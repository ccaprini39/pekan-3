'use client'

import { useFullscreen } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Toggle } from './toggle';
import { Button } from './button';
import { Expand, Maximize, Minimize, Shrink } from 'lucide-react';

export default function FullScreenToggle() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <div>
      {fullscreen ?
        <Button onClick={toggle} variant='outline' size={'icon'}>
          <Shrink
            className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all'
          />
        </Button>
        :
        <Button onClick={toggle} variant='outline' size={'icon'}>
          <Expand
            className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all'
          />
        </Button>
      }
      <span className="sr-only">Toggle fullscreen</span>
    </div>
  )
}