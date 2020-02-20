/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : user methods
 */

import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  /**
   * 비밀번호 확인
   * @param digest
   * @returns {boolean}
   */
  checkPassword(digest: string): boolean {
    check(digest, String);

    try {
      if (this.userId) {
        const user = Meteor.user();
        const result = Accounts._checkPassword(user, {digest, algorithm: 'sha-256'});
        return result.error == null;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  },
});
