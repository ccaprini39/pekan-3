
import checkSession from "../api/auth/sessionChecker";
import SignIn from "./SignIn";


export default async function UserPage(){

  const session = await checkSession();

  console.log(session)
  if(!session){
    return (
      <div className="h-full w-full">
        <h1>Not logged in</h1>
        <SignIn />
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      user page
    </div>
  )
}