import React, { useContext, useState } from "react"
import bemCssModules from "bem-css-modules"
import { StoreContext } from "../../stores/StoreProvider"

import { default as HeaderStyles } from "./Header.module.scss"
import LoginForm from "../LoginForm/LoginForm"
const block = bemCssModules(HeaderStyles)

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, setUser } = useContext(StoreContext)
  const setProperlyLabel = Boolean(user) ? "Wyloguj się" : "Zaloguj się"

  const handleOnClose = () => setIsModalOpen(false)

  const handleOnClick = () => {
    if (Boolean(user)) {
      setUser(null)
    } else {
      setIsModalOpen(true)
    }
  }
  return (
    <header className={block("")}>
      <div className={block("logo-wrapper")} />
      <h1 className={block("title")}>Polecane kursy dla programistów</h1>
      <button onClick={handleOnClick}>{setProperlyLabel}</button>
      <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
    </header>
  )
}

export default Header
