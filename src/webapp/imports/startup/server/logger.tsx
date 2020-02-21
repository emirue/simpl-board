/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 : logger
 */

import { Meteor } from 'meteor/meteor';
import log from '../both/logger';

const bound = Meteor.bindEnvironment((callback) => {callback();});
process.on('uncaughtException', function (err) {
  bound(() => {
    log.error('Server Crashed!', err);
    console.error(err.stack);
    process.exit(7);
  });
});

Meteor.startup(function(){
  // @ts-ignore
  for (let [method, name] of Object.entries(Meteor.default_server.method_handlers)) {
    // @ts-ignore
    Meteor.default_server.method_handlers[name] = log.info(name, method);
  }
});