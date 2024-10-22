import { showErrorNotification, showSuccessNotification } from "./notification"
const errorHandler = (error) =>  {
    if(!navigator.onLine) {
      showSuccessNotification('No Internet Connection.')
    }

    console.log(error.response.status)
}