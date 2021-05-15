import React, { useContext } from "react"
import bemCssModules from "bem-css-modules"

import Course from "../Course/Course"
import { StoreContext } from "../../stores/StoreProvider"

import { default as UserCoursesStyles } from "./UserCourses.module.scss"

const block = bemCssModules(UserCoursesStyles)

const UserCourses = () => {
  const { user, courses } = useContext(StoreContext)
  const buyedCourses = courses
    .filter((course) => user.courses.includes(course.id))
    .map((course) => (
      <Course isUserContext={true} key={course.id} {...course} />
    ))

  return (
    <section className={block()}>
      <h2 className={block("title")}>Twoje wykupione kursy</h2>
      <ul className={block("list")}>{buyedCourses}</ul>
    </section>
  )
}

export default UserCourses
