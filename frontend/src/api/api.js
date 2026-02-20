// import axios from "axios"

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// })

// console.log("API base URL:", import.meta.env.VITE_API_URL);

// API.interceptors.request.use((config) => {
//   const role = localStorage.getItem("activeRole");
//   const token = localStorage.getItem(`token_${role}`);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token")
//       localStorage.removeItem("user")
//       window.location.href = "/login"
//     }

//     return Promise.reject(error)
//   }
// )


// export default API


import axios from "axios"

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

console.log("API BASE URL:", import.meta.env.VITE_API_URL)

API.interceptors.request.use((config) => {
  const role = localStorage.getItem("activeRole")
  const token = localStorage.getItem(`token_${role}`)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default API
