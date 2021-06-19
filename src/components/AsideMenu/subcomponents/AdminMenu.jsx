import React from "react"
import bemCssModules from "bem-css-modules"
import { NavLink } from "react-router-dom"

import { default as AsideMenuStyles } from "../AsideMenu.module.scss"

const block = bemCssModules(AsideMenuStyles)

const AdminMenu = () => {
  return (
    <>
      <p className={block("title")}>Admin Panel</p>
      <nav>
        <ul className={block("list")}>
          <li className={block("link")}>
            <NavLink to='/manage-courses' activeClassName='is-active'>
              Manage courses
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AdminMenu
