import React, { useState, useContext, useEffect } from "react"
import bemCssModules from "bem-css-modules"

import Modal from "../Modal/Modal"
import { StoreContext } from "../../stores/StoreProvider"
import request from "../../helpers/request"

import { default as LoginFormStyles } from "./LoginForm.module.scss"

const block = bemCssModules(LoginFormStyles)

const LoginForm = ({ handleOnClose, isModalOpen }) => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [validateMessage, setValidateMessage] = useState("")
  const { setUser } = useContext(StoreContext)

  const handleInputLoginChange = ({ target: { value } }) => {
    setLogin(value)
  }

  const handleInputPasswordChange = ({ target: { value } }) => {
    setPassword(value)
  }

  const handleOnCloseModal = (e) => {
    e.preventDefault()
    handleOnClose()
  }

  const resetStateOfInputs = () => {
    setLogin("")
    setPassword("")
    setValidateMessage("")
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const { data, status } = await request.post("./users", { login, password })

    if (status === 200) {
      setUser(data.user)
      resetStateOfInputs()
      handleOnClose()
    } else {
      setValidateMessage(data.message)
    }
  }

  useEffect(() => {
    if (isModalOpen) {
      resetStateOfInputs()
    }
  }, [isModalOpen])

  const validateMessageComponent = validateMessage.length ? (
    <p className={block("validate-message")}>{validateMessage}</p>
  ) : null

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
    >
      <form className={block()} method='post' onSubmit={handleOnSubmit}>
        {validateMessageComponent}
        <div className={block("row")}>
          <label>
            Login:
            <input
              type='text'
              value={login}
              onChange={handleInputLoginChange}
            />
          </label>
        </div>
        <div className={block("row")}>
          <label>
            Hasło
            <input
              type='password'
              value={password}
              onChange={handleInputPasswordChange}
            />
          </label>
        </div>
        <div className={block("row")}>
          <button type='submit'>Zaloguj</button>
          <button type='button' onClick={handleOnCloseModal}>
            Anuluj
          </button>
        </div>
      </form>
    </Modal>
  )
}
export default LoginForm
