import React, { useEffect, useState } from "react"
import { createSpeechWithFilename, serveSpeech } from "../speech/server-components"

type Voice = "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer";

export function AudioComponent({ string, voice, filename, defaultOpen, autoPlay }: { string: string, voice: Voice, filename: string, defaultOpen: boolean, autoPlay: boolean }) {

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
          className='bg-red-500 hover:bg-red-700 w-5 h-5 text-white font-bold rounded shadow focus:outline-none focus:shadow-outline'
          onClick={() => setOpen(false)}
        >
          x
        </button>
      }
      {!open &&
        <button
          title="Click to open audio"
          className='relative bg-grey-500 hover:bg-grey-700 w-5 h-5 text-white font-bold rounded shadow focus:outline-none focus:shadow-outline'
          onClick={() => setOpen(true)}
        >
          {">"}
        </button>
      }

      {
        open && loading &&
        <div>Loading...</div>
      }

      {
        open && !loading &&
        <MinimalistAudioComponent src={speechUrl} />

      }

    </div>
  )
}

function MinimalistAudioComponent({ src }: { src: string }) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Number(e.target.value);
    setCurrentTime(audio.currentTime);
  };

  return (
    <div >
      <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
      <input type="range" min="0" max={duration} value={currentTime} onChange={onSliderChange} />
      <audio ref={audioRef} src={src} />
    </div>
  );
}