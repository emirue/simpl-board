/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 :
 */

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import ModalLib from '../../client/common/ModalLib';

export default class CommonMethod extends ValidatedMethod {
  constructor(param: { name: string; run(params: any): void; validate: any }) {
    super();
  }

  call(args, callback){
    if(Meteor.isClient){
      ModalLib.showLoading();
      super.call(args, function(err, res){
        ModalLib.hideLoading();
        if(err){
          ModalLib.alert(err.reason || err.message || err.error || err);
        }

        if(callback && typeof callback === "function") {
          callback(err, res);
        }
      });
    }else if(Meteor.isServer){
      super.call(args, callback);
    }
  }
}
