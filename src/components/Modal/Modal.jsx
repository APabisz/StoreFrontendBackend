import React, { useRef, useEffect } from "react"
import ReactDOM from "react-dom"
import bemCssModules from "bem-css-modules"

import { default as ModalStyles } from "./Modal.module.scss"

const block = bemCssModules(ModalStyles)

const Modal = ({
  children,
  handleOnClose,
  isOpen,
  shouldBeCloseOnOutsideClick,
}) => {
  const modalRef = useRef(null)
  const previuosActiveElement = useRef(null)

  useEffect(() => {
    if (!modalRef.current) {
      return
    }
    const { current: modal } = modalRef
    if (isOpen) {
      previuosActiveElement.current = document.activeElement
      modal.showModal()
    } else if (previuosActiveElement.current) {
      modal.close()
      previuosActiveElement.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const { current: modal } = modalRef
    const handleCancel = (e) => {
      e.preventDefault()
      handleOnClose()
    }

    modal.addEventListener("cancel", handleCancel)

    return () => {
      modal.removeEventListener("cancel", handleCancel)
    }
  }, [handleOnClose])

  const handleOutsideClick = ({ target }) => {
    const { current } = modalRef
    if (shouldBeCloseOnOutsideClick && target === current) {
      handleOnClose()
    }
  }

  return ReactDOM.createPortal(
    <dialog className={block()} ref={modalRef} onClick={handleOutsideClick}>
      {children}
    </dialog>,
    document.body
  )
}

export default Modal
