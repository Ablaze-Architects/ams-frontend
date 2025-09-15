// Save token + role
export const setAuth = (token, role) => {
  localStorage.setItem("token", token)
  localStorage.setItem("role", role)
}

// Get token
export const getToken = () => localStorage.getItem("token")

// Get role
export const getRole = () => localStorage.getItem("role")

// Remove auth (logout)
export const clearAuth = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("role")
}
