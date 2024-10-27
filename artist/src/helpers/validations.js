import { mapDate } from "./common";

export const dateOfBirthValidation = async (_rule, value) => {
    if(value === '' || value === null) {
      return Promise.reject('Please enter your dob!')
    }

    const currentDate = new Date();
    const userDate = new Date(mapDate(value));
    const currentYear = currentDate.getFullYear()

    const inputYear = userDate.getFullYear()
    const minAge = 16

   // Check if userDate is a valid date and is not in the future
    if (inputYear > currentYear) {
        return Promise.reject("Dob can not in the future!");
    }


    if((currentYear - inputYear) < minAge) {
      return Promise.reject("Minimum age must be 16 or above.")
    }

    return Promise.resolve();
};

export const phoneValidation  = async (_rule, value) => {
   if(value === "") {
      return Promise.reject("Please enter your phone number!")
   }

   if (isNaN(value)) {
      return Promise.reject("Phone must be number")
   }

   return Promise.resolve()
}


