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
    <li className={block("author-item")} key={author}>
      <p className={block("author-name")}>{author}</p>
      <button
        className={block("btn-delete-author")}
        data-author={author}
        onClick={deleteAuthor}
      >
        Delete
      </button>
    </li>
  ))

  const correctLabel = isEditMode ? "Update course" : "Create new course"

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
              Author:
              <input
                className={block("input")}
                onChange={handleOnChangeAuthor}
                type='text'
                value={formAuthor}
              />
              <button className={block("btn-add-author")} onClick={addAuthor}>
                Add author
              </button>
            </label>
          </div>
          <div className={block("form-row")}>
            <label>
              Image url:
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
              Price:
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
              Title:
              <input
                className={block("input")}
                onChange={handleOnChangeTitle}
                type='text'
                value={formTitle}
              />
            </label>
          </div>
          <button className={block("btn-submit")} type='submit'>
            {correctLabel}
          </button>
          <button
            className={block("btn-cancel")}
            type='button'
            onClick={hidePopup}
          >
            Cancel
          </button>
        </form>
        <div className={block("author-title")}>Current authors:</div>
        <ul className={block("author-list")}>{authorsElements}</ul>
      </div>
    </Modal>
  )
}

export default CoursePopup
