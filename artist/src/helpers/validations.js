const validatePass = async (_rule, value) => {
    if (value === '') {
      return Promise.reject('Please input the password');
    } else {
      if (formState.password !== '') {
        formRef.value.validateFields('password');
      }
      return Promise.resolve();
    }
  };
  const validatePass2 = async (_rule, value) => {
    if (value === '') {
      return Promise.reject('Please input the password again');
    } else if (value !== formState.password) {
      return Promise.reject("Two inputs don't match!");
    } else {
      return Promise.resolve();
    }
  };

export const registerValidation = {
    password: [
        {
          required: true,
          validator: validatePass,
          trigger: 'change',
        },
      ],
      confirmation_password: [
        {
          validator: validatePass2,
          trigger: 'change',
        },
      ],
}