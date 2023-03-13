import React from "react"
import { HashRouter as Router } from "react-router-dom"

import AsideMenu from "./components/AsideMenu/AsideMenu"
import Content from "./components/Content/Content"
import Header from "./components/Header"
import StoreProvider from "./stores/StoreProvider"

import "./App.scss"

const App = () => (
  <StoreProvider>
    <Header />
    <Router>
      <div className='main-wrapper'>
        <div className='content-wrapper'>
          <AsideMenu />
          <Content />
        </div>
      </div>
    </Router>
  </StoreProvider>
)

export default App