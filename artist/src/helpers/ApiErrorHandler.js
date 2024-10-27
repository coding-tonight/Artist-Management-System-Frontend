import { showErrorNotification, showInfoNotification, showSuccessNotification } from "./notification"

const fieldErrorHandler = (data) => {
  if(!data) {
    showErrorNotification('Validation error')
    return
  }

  for(const [key, value] of Object.entries(data)) {
      showErrorNotification(`${key} ${value[0]}`)
  }
}

export const errorHandler = (error) =>  {
    if(!navigator.onLine) {
      showInfoNotification('No Internet Connection.')
      return
    }

    switch(error?.response?.status) {
        case 401:
          localStorage.clear()
          window.location.replace('/login')
          return

        case 403:
            window.location.replace('/unauthorized')
            return

        case 422:
          fieldErrorHandler(error?.response?.data)
          return
        
        case 400:
          showErrorNotification("Bad Request")
          return

        case 404:
           return

        case 500:
           showErrorNotification("Ops something went wrong")
           return
        
        default:
          showErrorNotification("Ops something went wrong")
          return
    }
}