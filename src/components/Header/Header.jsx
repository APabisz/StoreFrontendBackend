import React, { useContext, useState } from "react"
import bemCssModules from "bem-css-modules"
import { StoreContext } from "../../stores/StoreProvider"

import { default as HeaderStyles } from "./Header.module.scss"
import LoginForm from "../LoginForm/LoginForm"
const block = bemCssModules(HeaderStyles)

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user, setUser } = useContext(StoreContext)
  const setProperlyLabel = Boolean(user) ? "Log out" : "Log in"

  const handleOnClose = () => setIsModalOpen(false)

  const handleOnClick = (e) => {
    switch (e.target.id) {
      case "btn-log": {
        if (Boolean(user)) {
          setUser(null)
        } else {
          setIsModalOpen(true)
        }
        break
      }

      case "btn-reg": {
        setIsModalOpen(true)
        break
      }
    }
  }

  const registerButton = Boolean(user) ? null : (
    <button id='btn-reg' className={block("btn")} onClick={handleOnClick}>
      Register
    </button>
  )

  return (
    <header className={block("")}>
      <div className={block("wrapper")}>
        <div className={block("logo-wrapper")} />
        <h1 className={block("title")}>E-learning</h1>
        <div className={block("buttons-wrapper")}>
          {registerButton}
          <button id='btn-log' className={block("btn")} onClick={handleOnClick}>
            {setProperlyLabel}
          </button>
        </div>
        <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
      </div>
    </header>
  )
}

export default Header
