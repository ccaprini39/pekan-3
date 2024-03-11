'use client'

export default function WorkPage() {

  return (
    <div
      className='w-screen h-screen p-5'
    >
      <Mgs2Ambiance />
    </div>
  )
}

function Mgs2Ambiance() {
  return (
    <div>
      <iframe 
        width="560" height="315" 
        src="https://www.youtube.com/embed/ycnGEvD07gU?si=KL4nmM1OqI2jHmyC" title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen>
      </iframe>
    </div>
  )
}