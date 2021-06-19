import React, { useContext, useState } from "react"
import { StoreContext } from "../../stores/StoreProvider"
import CourseDetails from "./subcomponents/CourseDetails"
import CoursePopup from "./subcomponents/CoursePopup"
import bemCssModules from "bem-css-modules"
import { default as AdminPanelStyles } from "./AdminPanel.module.scss"

const block = bemCssModules(AdminPanelStyles)

const AdminPanel = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const { courses } = useContext(StoreContext)

  const showPopup = () => setIsOpenPopup(true)

  const hidePopup = (e) => {
    if (e) {
      e.preventDefault()
    }
    setIsOpenPopup(false)
  }

  const coursesElements = courses.map((course) => (
    <CourseDetails key={course.id} {...course} />
  ))

  return (
    <section className={block()}>
      {coursesElements}
      <button className={block("btn-add")} onClick={showPopup}>
        Add new course
      </button>
      <CoursePopup
        isOpenPopup={isOpenPopup}
        hidePopup={hidePopup}
        isEditMode={false}
      />
    </section>
  )
}

export default AdminPanel
