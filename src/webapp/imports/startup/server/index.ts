/**
 * 제작 : emirue
 * 날짜 : 2020-02-15
 * 내용 : server index
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
// @ts-ignore
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(() => {
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

    Roles.addUsersToRoles(userId, ['admin']);
  }
});