import { useEffect, useState } from "react"
import { createSpeechWithFilename, serveSpeech } from "../speech/server-components"

type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

export function AudioComponent({ string, voice, filename, defaultOpen, autoPlay }: { string: string, voice: Voice, filename: string, defaultOpen: boolean, autoPlay: boolean}) {

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