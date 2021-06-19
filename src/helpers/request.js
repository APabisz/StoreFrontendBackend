import axios from "axios"

const request = axios.create({
  baseURL: "https://nodejs-e-learning.herokuapp.com/",
  validateStatus: false,
})

export default request
