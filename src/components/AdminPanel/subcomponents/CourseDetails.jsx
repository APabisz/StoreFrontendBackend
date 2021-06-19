import React, { useContext, useState } from "react"
import request from "../../../helpers/request"
import bemCssModules from "bem-css-modules"

import { StoreContext } from "../../../stores/StoreProvider"
import CoursePopup from "./CoursePopup"
import { default as CourseDetailsStyles } from "./CourseDetails.module.scss"

const block = bemCssModules(CourseDetailsStyles)

const CourseDetails = (props) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const { setCourses } = useContext(StoreContext)
  const { id, title } = props

  const showPopup = () => setIsOpenPopup(true)

  const hidePopup = (e) => {
    if (e) {
      e.preventDefault()
    }
    setIsOpenPopup(false)
  }

  const handleDeleteCourse = async () => {
    try {
      const { status } = await request.delete(`/courses/${id}`)

      if (status === 200) {
        setCourses((prev) => prev.filter((course) => course.id !== id))
        hidePopup()
      }
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <details className={block()}>
      <summary className={block("title")}>{title}</summary>
      <button className={block("btn-edit")} onClick={showPopup}>
        Edit
      </button>
      <button className={block("btn-delete")} onClick={handleDeleteCourse}>
        Delete
      </button>
      <CoursePopup hidePopup={hidePopup} isOpenPopup={isOpenPopup} {...props} />
    </details>
  )
}

export default CourseDetails
