import { notification } from "ant-design-vue";

const config = {
    placement: 'bottomRight',
    type: 'success',
    duration: 10,
    maxCount: 1,
}

notification.config(config)

export const showSuccessNotification = (message) => {
  notification.success({ message })
}

export const showErrorNotification = (message) => {
  notification.error({ message  })
}

export const showInfoNotification = (message) => {
  notification.info({ message })
}

export const showWarningNotification = (message) => {
    notification.warn({ message  })
}