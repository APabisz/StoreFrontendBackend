import React from "react"
import bemCssModules from "bem-css-modules"

import { default as CourseStyles } from "./Course.module.scss"

const block = bemCssModules(CourseStyles)

const Course = ({ authors, img, price, title }) => {
  const allAuthors = authors.join(", ")

  return (
    <li>
      <article className={block()}>
        <h3 className={block("title")}>{title}</h3>
        <img src={img} alt='title' className={block("image")} />
        <p className={block("price")}>{`Koszt kursu: ${price}`}</p>
        <p className={block("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
      </article>
    </li>
  )
}

export default Course
