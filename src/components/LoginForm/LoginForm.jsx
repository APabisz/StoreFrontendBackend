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
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validateMessage, setValidateMessage] = useState("")
  const [formType, setFormType] = useState("")
  const { setUser } = useContext(StoreContext)

  const handleInputLoginChange = ({ target: { value } }) => {
    setLogin(value)
  }

  const handleInputPasswordChange = ({ target: { value } }) => {
    setPassword(value)
  }

  const handleInputConfirmPasswordChange = ({ target: { value } }) => {
    setConfirmPassword(value)
  }

  const handleOnCloseModal = (e) => {
    e.preventDefault()
    handleOnClose()
  }

  const resetStateOfInputs = () => {
    setLogin("")
    setPassword("")
    setConfirmPassword("")
    setValidateMessage("")
  }

  const validateForm = () => {
    if (!(login.length > 0) || !(password.length > 0)) {
      const err = "You have to insert login and password to continue"
      setValidateMessage(err)
      return false
    }

    if (password.length < 5) {
      const err = "Password must have at least 5 signs"
      setValidateMessage(err)
      return false
    }

    if (password !== confirmPassword && formType === "register") {
      const err = "Passwords aren't equal"
      setValidateMessage(err)
      return false
    }

    return true
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return
    const { data, status } = await request.post("./users", {
      login,
      password,
      formType,
    })

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

  const handleSetButtonText = (btn) => {
    btn === "btn-reg" ? setFormType("register") : setFormType("login")
  }

  const validatePasswordComponent =
    formType === "register" ? (
      <div className={block("row")}>
        <label>
          Confirm password
          <input
            type='password'
            value={confirmPassword}
            onChange={handleInputConfirmPasswordChange}
          />
        </label>
      </div>
    ) : null

  return (
    <Modal
      handleOnClose={handleOnClose}
      isOpen={isModalOpen}
      shouldBeCloseOnOutsideClick={true}
      handleSetButtonText={handleSetButtonText}
    >
      <form
        className={block()}
        method='post'
        onSubmit={handleOnSubmit}
        autocomplete='off'
      >
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
            Password:
            <input
              type='password'
              value={password}
              onChange={handleInputPasswordChange}
            />
          </label>
        </div>
        {validatePasswordComponent}
        <div className={block("row")}>
          <button className={block("btn-submit")} type='submit'>
            {formType === "register" ? "Register" : "Log in"}
          </button>
          <button
            className={block("btn-cancel")}
            type='button'
            onClick={handleOnCloseModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}
export default LoginForm
