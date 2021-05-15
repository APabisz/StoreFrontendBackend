import React, { useContext, useState } from "react"
import { StoreContext } from "../../../stores/StoreProvider"
import bemCssModules from "bem-css-modules"
import Modal from "../../Modal/Modal"
import request from "../../../helpers/request"

import { default as CoursePopupStyles } from "./CoursePopup.module.scss"

const block = bemCssModules(CoursePopupStyles)

const CoursePopup = ({
  authors = [],
  hidePopup,
  isEditMode = true,
  isOpenPopup,
  id,
  img = "",
  price = 0,
  title = "",
}) => {
  const [formAuthors, setFormAuthors] = useState(authors)
  const [formAuthor, setFormAuthor] = useState("")
  const [formImg, setFormImg] = useState(img)
  const [formPrice, setFormPrice] = useState(price)
  const [formTitle, setFormTitle] = useState(title)
  const { setCourses } = useContext(StoreContext)

  const handleOnChangeAuthor = (e) => setFormAuthor(e.target.value)
  const handleOnChangeImg = (e) => setFormImg(e.target.value)
  const handleOnChangePrice = (e) => setFormPrice(e.target.value)
  const handleOnChangeTitle = (e) => setFormTitle(e.target.value)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const courseObject = {
      authors: formAuthors,
      id,
      img: formImg,
      price: formPrice,
      title: formTitle,
    }

    if (isEditMode) {
      const { data, status } = await request.put("/courses", courseObject)
      courseObject.id = id
      if (status === 202) {
        setCourses(data.courses)
      }
    } else {
      const { data, status } = await request.post("/courses", courseObject)
      if (status === 201) {
        setCourses(data.courses)
      }
    }

    hidePopup()
  }

  const addAuthor = (e) => {
    e.preventDefault()
    setFormAuthors((prev) => [...prev, formAuthor])
    setFormAuthor("")
  }

  const deleteAuthor = (e) => {
    const authorToDelete = e.target.dataset.author
    setFormAuthors((prev) => prev.filter((author) => author !== authorToDelete))
  }

  const authorsElements = formAuthors.map((author) => (
    <li key={author}>
      <p>{author}</p>
      <button data-author={author} onClick={deleteAuthor}>
        Usuń
      </button>
    </li>
  ))

  const correctLabel = isEditMode ? "Aktualizuj kurs" : "Utwórz kurs"

  return (
    <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
      <div className={block()}>
        <form
          className={block("form")}
          method='submit'
          onSubmit={handleFormSubmit}
        >
          <div className={block("form-row")}>
            <label>
              Autor:
              <input
                className={block("input")}
                onChange={handleOnChangeAuthor}
                type='text'
                value={formAuthor}
              />
              <button onClick={addAuthor}>Dodaj autora</button>
            </label>
          </div>
          <div className={block("form-row")}>
            <label>
              Obrazek url:
              <input
                className={block("input")}
                onChange={handleOnChangeImg}
                type='text'
                value={formImg}
              />
            </label>
          </div>
          <div className={block("form-row")}>
            <label>
              Cena:
              <input
                className={block("input")}
                onChange={handleOnChangePrice}
                type='number'
                value={formPrice}
              />
            </label>
          </div>
          <div className={block("form-row")}>
            <label>
              Tytuł:
              <input
                className={block("input")}
                onChange={handleOnChangeTitle}
                type='text'
                value={formTitle}
              />
            </label>
          </div>
          <button type='submit'>{correctLabel}</button>
          <button type='button' onClick={hidePopup}>
            Anuluj
          </button>
        </form>
        <ul>{authorsElements}</ul>
      </div>
    </Modal>
  )
}

export default CoursePopup
