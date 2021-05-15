import React from "react"
import StoreProvider from "./stores/StoreProvider"
import "./App.scss"
import Header from "./components/Header"

const App = () => (
  <StoreProvider>
    <Header />
  </StoreProvider>
)

export default App
