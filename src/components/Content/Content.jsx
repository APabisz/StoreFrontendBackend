import React, { useContext } from "react"
import { Redirect, Switch, Route } from "react-router-dom"
import bemCssModules from "bem-css-modules"
import Courses from "../Courses/Courses"
import UserCourses from "../UserCourses/UserCourses"

import { default as ContentStyles } from "./Content.modules.scss"
import { StoreContext } from "../../stores/StoreProvider"

const block = bemCssModules(ContentStyles)
const ADMIN_TYPE = 1

const Content = () => {
  const { user } = useContext(StoreContext)

  const isUserLogged = Boolean(user)
  const isAdmin = user?.accessLevel === ADMIN_TYPE

  return (
    <main className={block()}>
      <Switch>
        <Route exact path='/' render={() => <Courses />} />
        {isUserLogged && (
          <Route exact path='/my-courses' render={() => <UserCourses />} />
        )}
        {isAdmin && (
          <Route
            exact
            path='/manage-courses'
            render={() => <p>Zarządzanie kursami</p>}
          />
        )}
        <Redirect to='/' />
      </Switch>
    </main>
  )
}

export default Content
