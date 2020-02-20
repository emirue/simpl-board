/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 :
 */

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import CommonModal from '../../client/common/CommonModal';

export default class CommonMethod extends ValidatedMethod {
  constructor(param: { name: string; run(params: any): void; validate: any }) {
    super();
  }

  call(args, callback){
    if(Meteor.isClient){
      CommonModal.showLoading();
      super.call(args, function(err, res){
        CommonModal.hideLoading();
        if(err){
          CommonModal.alert(err.reason || err.message || err.error || err);
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