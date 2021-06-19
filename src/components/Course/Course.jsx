import React, { useContext } from "react"
import { useHistory } from "react-router"
import bemCssModules from "bem-css-modules"

import { StoreContext } from "../../stores/StoreProvider"
import request from "../../helpers/request"

import { default as CourseStyles } from "./Course.module.scss"

const block = bemCssModules(CourseStyles)

const Course = ({
  authors,
  id,
  img,
  isBought = false,
  isUserContext = false,
  price,
  title,
}) => {
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
      console.warn(error)
    }
  }

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext && !isBought
  const shouldBeAlreadyBoughtTextVisible =
    isUserLogged && !isUserContext && isBought
  return (
    <li>
      <article className={block()}>
        <h3 className={block("title")}>{title}</h3>
        <div className={block("image-wrapper")}>
          <img src={img} alt='title' className={block("image")} />
        </div>
        <p className={block("price")}>{`Price: ${price} zł`}</p>
        <p className={block("authors")}>{`Authors: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button className={block("btn-buy")} onClick={handleOnClick}>
            Buy now
          </button>
        )}
        {shouldBeAlreadyBoughtTextVisible && (
          <p className={block("bought")}>{`Already bought`}</p>
        )}
      </article>
    </li>
  )
}

export default Course
