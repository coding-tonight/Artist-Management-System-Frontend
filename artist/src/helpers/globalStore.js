import { App } from 'ant-design-vue';

export const useGlobalStore = defineStore('global', () => {
  const message = ref();
  const notification = ref();
  const modal = ref();
  (() => {
    const staticFunction = App.useApp();
    message.value = staticFunction.message;
    modal.value = staticFunction.modal;
    notification.value = staticFunction.notification;
  })();

  return { message, notification, modal };
});
