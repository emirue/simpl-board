/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 :
 */

import { Session } from "meteor/session";

const CommonModal = {
  alertsCallback: null,
  confirmOkCallback: null,
  confirmCancelCallback: null,
  hideModal($modal): void {
    $modal.modal('hide').data('bs.modal', null);
    $('body').removeClass('modal-open');
    $(".modal-backdrop").remove();
  },
  /**
   * show alert
   * @param message
   * @param callback
   */
  alert(message: string, callback?: any): void {
    const alerts = Session.get('alerts');
    if (alerts && alerts.visible) return;

    if (callback) CommonModal.alertsCallback = callback;

    Session.set('alerts', {
      visible: true,
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
//
// /**
//  * display toast
//  * http://bootstrap-notify.remabledesigns.com/#documentation
//  * https://daneden.github.io/animate.css/
//  * @param message
//  * @param type
//  *    success
//  *    info
//  *    warning
//  *    danger
//  */
// CommonModal.toast = function(message, type = 'success'){
//   $.notify({
//     message,
//   }, {
//     type,
//     delay: 3000,
//     z_index: 999999,
//   });
// };
//
// /**
//  * show confirm
//  * @param message
//  * @param okCallback
//  * @param cancelCallback
//  */
// CommonModal.confirm = function(message, okCallback, cancelCallback){
//   const confirm = Session.get('confirm');
//   if (confirm.visible) return;
//
//   if (okCallback) CommonModal.confirmOkCallback = okCallback;
//   if (cancelCallback) CommonModal.confirmCancelCallback = cancelCallback;
//
//   Session.set('confirm', {
//     visible: true,
//     message,
//   });
// };

export default CommonModal;
