import React, { useContext } from "react"
import bemCssModules from "bem-css-modules"
import { StoreContext } from "../../stores/StoreProvider"
import Course from "../Course/Course"

import { default as CoursesStyles } from "./Courses.module.scss"

const block = bemCssModules(CoursesStyles)

const Courses = () => {
  const { user, courses } = useContext(StoreContext)
  const isUserLogged = Boolean(user)

  // const coursesElements = courses.map((course) => (
  //   <Course key={course.id} {...course} />
  // ))

  // .filter((course) => user.courses.includes(course.id))
  const coursesElements = courses.map((course) => {
    let isBought = false
    if (isUserLogged) isBought = user.courses.includes(course.id)
    return (
      <Course
        isBought={isBought}
        isUserContext={false}
        key={course.id}
        {...course}
      />
    )
  })
  return (
    <section className={block()}>
      <h2 className={block("title")}>Available courses</h2>
      <ul className={block("list")}>{coursesElements}</ul>
    </section>
  )
}

export default Courses
