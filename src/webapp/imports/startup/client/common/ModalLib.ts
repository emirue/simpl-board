/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 : modal library
 */

import {Session} from "meteor/session";

export interface ICommonModalState {
  show?: boolean;
  title?: string;
  message?: string;
  okCallback?: any;
  cancelCallback?: any;
}

const ModalLib = {
  okCallback: null,
  cancelCallback: null,
  initCallback(): void {
    ModalLib.okCallback = null;
    ModalLib.cancelCallback = null;
  },
  /**
   * show modal
   * @param title
   * @param message
   * @param okCallback
   * @param cancelCallback
   */
  showModal({ title, message, okCallback, cancelCallback }: ICommonModalState): void {
    ModalLib.initCallback();

    if (okCallback) ModalLib.okCallback = okCallback;
    if (cancelCallback) ModalLib.cancelCallback = cancelCallback;

    Session.set('commonModal', {
      title,
      message,
    });
  },
  /**
   * show alert
   * @param message
   * @param callback
   */
  alert(message: string, callback?: any): void {
    ModalLib.initCallback();

    if (callback) ModalLib.okCallback = callback;

    Session.set('commonModal', {
      title: 'alert',
      message,
    });
  },
  showLoading(): void {
    Session.set('isLoading', true);
  },
  hideLoading(): void {
    Session.set('isLoading', false);
  }
};

export default ModalLib;
