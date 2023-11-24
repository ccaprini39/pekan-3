'use client'

import { useState, useEffect } from 'react'
import { createSpeech, createSpeechWithFilename, serveSpeech } from './server-components'

type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

export default function SpeechPage() {

  const cioran = `It is no nation that we inhabit, but a language. Make no mistake; our native tongue is our true fatherland.
Words are what keeps our world alive.
Conquer the world not by taking mens lives, but by taking their tongues.
Everything is stolen from them; their country, their family, their identity.  
Words can kill.
  `
  const [speechText, setSpeechText] = useState(cioran)
  const [speechUrl, setSpeechUrl] = useState('/speech.mp3')
  const [loading, setLoading] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<Voice>('alloy')
  const voiceOptions = [
    'alloy', //female
    'echo', //soft beta male
    'fable', //androgynous brit
    'onyx', //strong man
    'nova', //computer sounding worman
    'shimmer', //strong sounding female, slightly robotic
  ]

  async function handleGetSpeech() {
    setLoading(true)
    await createSpeech(speechText, selectedVoice)
    const dataUrl = await serveSpeech('new-speech-2.mp3')
    setSpeechUrl(dataUrl)
    console.log('got speech')
    setLoading(false)
  }


  return (
    <div
      className='m-2'
    >
      <h1>Speech</h1>
      <select
        className='border border-gray-400 rounded'
        value={selectedVoice}
        onChange={e => setSelectedVoice((e.target.value) as Voice)}
      >
        {
          voiceOptions.map(voice => (
            <option
              key={voice}
              value={voice}
            >
              {voice}
            </option>
          ))
        }
      </select>
      <textarea
        className='border border-gray-400 rounded w-full h-64'
        value={speechText}
        onChange={e => setSpeechText(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow focus:outline-none focus:shadow-outline'
        onClick={handleGetSpeech}
      >
        Get Speech
      </button>
      {
        loading ?
          <div>Loading...</div>
          :
          <audio controls>
            <source src={speechUrl} type='audio/mpeg' />
          </audio>
      }

      <br />

      <h1>Reusable Audio Component</h1>
      <ReusableAudioComponent
        string='here is something else I have written for my own amusement'
        voice='alloy'
        filename='new-speech-3.mp3'
        defaultOpen={true}
        autoPlay={false}
      />
    </div>
  )
}

export function ReusableAudioComponent({ string, voice, filename, defaultOpen, autoPlay, ref }: { string: string, voice: Voice, filename: string, defaultOpen: boolean, autoPlay: boolean,  }) {

  const [speechUrl, setSpeechUrl] = useState('/speech.mp3')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    async function loadAudio() {
      await createSpeechWithFilename(string, voice, filename)
      const dataUrl = await serveSpeech(filename)
      setSpeechUrl(dataUrl)
      setLoading(false)
    }
    setLoading(true)
    open && loadAudio()
  }, [open])

  useEffect(() => {
    if (!loading && autoPlay) {
      const audio = document.getElementById('audio') as HTMLAudioElement
      audio.play()
    }
  }, [loading, autoPlay])

  //character for the up arrow
  const upArrow = '\u25B2'
  //character for the down arrow
  const downArrow = '\u25BC'

  return (
    <div
      ref={ref}
      className='flex flex-row h-8'
    >
      {open &&
        <button
          className='bg-grey-500 hover:bg-grey-700 text-white font-bold rounded shadow focus:outline-none focus:shadow-outline'
          onClick={() => setOpen(false)}
        >
        {upArrow}
        </button>
      }
      {!open &&
        <button
          className='bg-grey-500 hover:bg-grey-700 text-white font-bold rounded shadow focus:outline-none focus:shadow-outline'
          onClick={() => setOpen(true)}
        >
          {downArrow}
        </button>
      }

      {
        open && loading &&
        <div>Loading...</div>
      }

      {
        open && !loading &&
        <audio className='h-12' id='audio' controls>
          <source src={speechUrl} type='audio/mpeg' />
        </audio>
      }

    </div>
  )
}