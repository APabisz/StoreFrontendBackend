import React, { useContext } from "react"
import bemCssModules from "bem-css-modules"
import { Link } from "react-router-dom"
import { StoreContext } from "../../../stores/StoreProvider"

import { default as AsideMenuStyles } from "../AsideMenu.module.scss"

const block = bemCssModules(AsideMenuStyles)

const UserMenu = ({ isUserLogged }) => {
  const { user } = useContext(StoreContext)

  return (
    <>
      <p className={block("title")}>User panel</p>
      {isUserLogged && (
        <p className={block("money")}>
          Available budget: <span>{user.budget.toFixed(2)} PLN</span>
        </p>
      )}

      <nav>
        <ul className={block("list")}>
          <li className={block("link")}>
            <Link to='/'>Curses available to buy</Link>
          </li>
          {isUserLogged && (
            <li className={block("link")}>
              <Link to='/my-courses'>My courses</Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}

export default UserMenu
