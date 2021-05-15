import React, { useContext } from "react"
import bemCssModules from "bem-css-modules"
import { StoreContext } from "../../stores/StoreProvider"
import UserMenu from "./subcomponents/UserMenu"
import AdminMenu from "./subcomponents/AdminMenu"

import { default as AsideMenuStyles } from "./AsideMenu.module.scss"

const block = bemCssModules(AsideMenuStyles)

const ADMIN_TYPE = 1

const AsideMenu = () => {
  const { user } = useContext(StoreContext)

  const adminMenuComponent =
    user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null

  return (
    <section className={block()}>
      <UserMenu isUserLogged={Boolean(user)} />
      {adminMenuComponent}
    </section>
  )
}

export default AsideMenu
