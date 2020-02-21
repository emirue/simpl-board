/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 : logging
 */

import { Meteor } from "meteor/meteor";
import util from 'util';
import bunyan from 'bunyan';
import PrettyStream from 'bunyan-prettystream';

let options = {
  name: 'service',
  streams: undefined,
};
const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

export const logger = bunyan.createLogger(options);

function formatArgs(args){
  return [util.format.apply(util.format, Array.prototype.slice.call(args))];
}

const consoleLogOriginal = console.log;
console.log = function(){
  // special case for meteor dev mode
  if(arguments.length === 1 && arguments[0] === 'LISTENING') {
    return consoleLogOriginal.call(console, 'LISTENING');
  }
  logger.info.apply(logger, formatArgs(arguments));
};
console.info = function(){
  logger.info.apply(logger, formatArgs(arguments));
};
console.warn = function(){
  logger.warn.apply(logger, formatArgs(arguments));
};
console.error = function(){
  logger.error.apply(logger, formatArgs(arguments));
};
console.debug = function(){
  logger.debug.apply(logger, formatArgs(arguments));
};

function logging(name, fn){
  return function(){
    console.debug(`[Method Call] ${name} - ${this.connection.clientAddress}, Data:`, arguments);
    return fn.apply(this, arguments);
  };
}

Meteor.startup(function(){
  for (let [method, name] of Object.entries(Meteor.default_server.method_handlers)) {
    Meteor.default_server.method_handlers[name] = logging(name, method);
  }
});