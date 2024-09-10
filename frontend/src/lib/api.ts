import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",
})

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response ? error.response.data : error.message);
//     return Promise.reject(error);
//   }
// );

export default api
