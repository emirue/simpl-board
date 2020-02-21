/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 : logger
 */

// @ts-ignore
import { Logger } from 'meteor/ostrio:logger';
// @ts-ignore
import { LoggerMongo } from 'meteor/ostrio:loggermongo';

const log = new Logger();
(new LoggerMongo(log)).enable();

export default log;
