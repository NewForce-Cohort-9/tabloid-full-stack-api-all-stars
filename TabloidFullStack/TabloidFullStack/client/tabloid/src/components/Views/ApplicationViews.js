import { useEffect, useState } from "react"
import { GeneralUserViews } from "./GeneralUserViews.js"
import { AdminViews } from "./AdminViews.js"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    setCurrentUser(userObject)
  }, [])

  return currentUser.userTypeId === 1 ? (
    <AdminViews currentUser={currentUser} />
  ) : (
    <GeneralUserViews currentUser={currentUser} />
    
  )
}