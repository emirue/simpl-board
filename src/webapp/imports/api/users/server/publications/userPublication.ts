/**
 * 제작 : emirue
 * 날짜 : 2020/02/19
 * 내용 : user publish
 */

import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Roles } from 'meteor/alanning:roles';

// Publish all role-assignments
Meteor.publish(null, function () {
  if (this.userId) {
    // @ts-ignore
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  } else {
    this.ready();
  }
});

// Authorized users can manage user accounts
Meteor.publish('users', function() {
  const user = Meteor.users.findOne({ _id: this.userId });

  // 관리자 및 사용자 관리권한이 있는 경우
  if (Roles.userInRole(user, ['admin', 'manage-users'])) {
    console.log('publishing users', this.userId);
    return [
      // @ts-ignore
      Meteor.roleAssignment.find({}),
      Meteor.users.find({}, {fields: {emails: 1, profile: 1}}),
    ];
  }

  this.stop();
  return;
});
