
export default function NotePage({params} : {params: {note: string}} ){
  console.log(params.note)
  return (
    <div
      className="h-full w-full"
    >
      <div>
        {params.note}
      </div>
    </div>
  )
}