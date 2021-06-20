import React, { createContext, useEffect, useState } from "react"
import request from "../helpers/request"

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState(null)
  const [loadingFromServer, setLoadingFromServer] = useState(false)

  const fetchData = async () => {
    const { data } = await request.get("/courses")
    setLoadingFromServer(false)
    setCourses(data.courses)
  }

  useEffect(() => {
    setLoadingFromServer(true)
    fetchData()
  }, [])
  return (
    <StoreContext.Provider
      value={{
        courses,
        setCourses,
        user,
        setUser,
        loadingFromServer,
        setLoadingFromServer,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
