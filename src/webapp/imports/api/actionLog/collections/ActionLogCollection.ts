/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : action log collection
 */

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

const ActionLogCollection = new Mongo.Collection('ActionLog');

if (Meteor.isServer) {
  ActionLogCollection._ensureIndex({_userId: 1, createdAt: 1});
}
