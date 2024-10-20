/**
 * encode string to base64
 * @param {string} value 
 * @returns 
 */
export const encodeBase64 = (value) => atob(value)

/**
 * decode the base64 to string
 * @param {string} value 
 * @returns 
 */
export const decodeBase64 = (value) => btoa(value)

/**
 * helper function to retrieve token
 * @returns 
 */
export const getToken = () => {
  const encodedToken = localStorage.getItem('access_token') || null
  if(encodedToken) return decodeBase64(encodedToken)

  return null
}

