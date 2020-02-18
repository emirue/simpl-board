/**
 * 제작 : emirue
 * 날짜 : 2020-02-15
 * 내용 : server index
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// @ts-ignore
import { Roles } from 'meteor/alanning:roles';
import UserRoles from '../both/roles/UserRoles';
import './publications';

Meteor.startup(() => {
  UserRoles.forEach(function(role: string) {
    Roles.createRole(role, {unlessExists: true});
  });
  const adminUser = Meteor.users.findOne({ username: 'admin' });
  if (!adminUser) {
    console.warn(
      `WARNING: Creating default admin user.
      Log in as \'admin@simpeboard.com\' with password \'secret\' and change the password!`
    );

    const userId = Accounts.createUser({
      email: 'admin@simpeboard.com',
      password: 'secret',
      username: 'admin',
    });

    Meteor.users.update({_id: userId}, {
      $set: {
        'emails.0.verified': true,
      },
    });

    // 모든 권한을 갖는다.
    Roles.addUsersToRoles(userId, UserRoles);
  }
});