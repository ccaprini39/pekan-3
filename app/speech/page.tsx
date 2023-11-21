'use client'

import { useState, useEffect } from 'react'
import { createSpeech, serveSpeech } from './server-components'

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

  async function handleGetSpeech() {
    setLoading(true)
    await createSpeech(speechText)
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
    </div>
  )
}