import React, { useContext } from "react"
import { useHistory } from "react-router"
import bemCssModules from "bem-css-modules"

import { StoreContext } from "../../stores/StoreProvider"
import request from "../../helpers/request"

import { default as CourseStyles } from "./Course.module.scss"

const block = bemCssModules(CourseStyles)

const Course = ({ authors, id, img, isUserContext = false, price, title }) => {
  const { user, setUser } = useContext(StoreContext)
  const history = useHistory()

  const allAuthors = authors.join(", ")
  const isUserLogged = Boolean(user)

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch("/users", {
        login: user.login,
        courseId: id,
      })
      if (status === 202) {
        setUser(data.user)
        history.push("/my-courses")
      }
    } catch (error) {
      console.warn(erorr)
    }
  }

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext
  return (
    <li>
      <article className={block()}>
        <h3 className={block("title")}>{title}</h3>
        <img src={img} alt='title' className={block("image")} />
        <p className={block("price")}>{`Koszt kursu: ${price}`}</p>
        <p className={block("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button onClick={handleOnClick}>Kup ten kurs</button>
        )}
      </article>
    </li>
  )
}

export default Course
