import { useEffect, useState } from "react"
import { AdminViews } from "./AdminViews.js"
import GeneralUserViews from "./GeneralUserViews.js"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localUser = localStorage.getItem("userProfile")
    const userObject = JSON.parse(localUser)

    setCurrentUser(userObject)
  }, [])

  return currentUser.userType.name === "Admin" ? (
    <AdminViews currentUser={currentUser} />
  ) : (
    <GeneralUserViews currentUser={currentUser} />
  )
}