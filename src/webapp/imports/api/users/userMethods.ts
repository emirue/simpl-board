/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : user methods
 */

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import * as SimpleSchema from 'simpl-schema';
// @ts-ignore
import { Roles } from 'meteor/alanning:roles';
import MongoLib from '../../startup/both/lib/MongoLib';
import CommonMethod from '../../startup/both/lib/CommonMethod';
import {getPageData} from "../common/page";

const UserMethods = {
  sendResetPasswordEmail: undefined,
  createUser: undefined,
  createAdmin: undefined,
  getUserListAll: undefined,
  getUser: undefined,
  getMemberCount: undefined,
  updateUser: undefined,
  getUserListPage: undefined,
  updateMyInfo: undefined,
  remove: undefined,
};

/**
 * 비밀번호 리셋 이메일 전송
 * @type {CommonMethod}
 */
UserMethods.sendResetPasswordEmail = new CommonMethod({
  name: "UserMethods.sendResetPasswordEmail",

  validate: new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validator(),

  run({ email }){
    if (Meteor.isServer) {
      let user = Accounts.findUserByEmail(email);
      if(user){
        Accounts.sendResetPasswordEmail(user._id);
      }else{
        throw new Meteor.Error("Email address error", "Can't find user with email " + email + ". Check your email address.");
      }
    }
  }
});

/**
 * 일반 사용자 회원가입
 * @type {CommonMethod}
 */
UserMethods.createUser = new CommonMethod({
  name: "UserMethods.createUser",

  validate: new SimpleSchema({
    name: {
      type: String,
      min: 1,
      label: '이름'
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: '이메일'
    },
    password: {
      type: String,
      min: 6,
      label: '비밀번호'
    },
    isReceiveAgreement: {
      type: Boolean,
      label: '수신동의'
    },
  }).validator(),

  run({name, email, password, isReceiveAgreement}){
    if (Meteor.isServer) {
      // 회원가입 여부 확인
      if (Meteor.users.findOne({username: email})) {
        throw new Meteor.Error('이미 등록된 회원입니다.');
      }

      const profile = {
        name,
        email,
        isReceiveAgreement
      };

      const userId = Accounts.createUser({username: email, email, password, profile});
      Accounts.sendVerificationEmail(userId);
      return userId;
    }
  }
});

/**
 * 회원 등록
 * @type {CommonMethod}
 */
UserMethods.createAdmin = new CommonMethod({
  name: "UserMethods.createAdmin",

  validate: new SimpleSchema({
    name: {
      type: String,
      min: 1,
      label: '이름'
    },
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
      label: '이메일'
    },
    birth: {
      type: String,
      label: '생년월일',
      optional: true
    },
    phone: {
      type: String,
      label: '전화번호',
      optional: true
    },
    password: {
      type: String,
      min: 6,
      label: '비밀번호'
    }
  }).validator(),

  run({name, email, birth, phone, password}){
    if (Meteor.isServer) {
      if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
        throw new Meteor.Error('Unauthorized', 'Not authorized to create new users');
      }

      const profile = {name, email, birth, phone};

      return Accounts.createUser({username: email, email, password, profile});
    }
  }
});

UserMethods.getUserListAll = new CommonMethod({
  name: "UserMethods.getUserListAll",

  validate: new SimpleSchema({
    query: {
      type: Object,
      blackbox: true,
      optional: true
    },
    sort: {
      type: Object,
      blackbox: true,
      optional: true
    }
  }).validator(),

  run({query = {}, sort = {'profile.name': 1}}){
    if (Meteor.isServer) {
      if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
        throw new Meteor.Error('Unauthorized');
      }
      query.isRemoved = false;

      return Meteor.users.find(query, {
        fields: {_id: 1, profile: 1},
        sort
      }).fetch();
    }
  }
});

UserMethods.getUser = new CommonMethod({
  name: "UserMethods.getUser",

  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),

  run({_id}){
    if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
      throw new Meteor.Error('Unauthorized');
    }

    if(Meteor.isServer){
      return Meteor.users.findOne(_id, {fields: {username: 1, profile: 1, code: 1, status: 1, createdAt: 1}});
    }
  }
});

UserMethods.getMemberCount = new CommonMethod({
  name: "UserMethods.getMemberCount",

  validate: new SimpleSchema({
  }).validator(),
  run(){
    if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
      throw new Meteor.Error('Unauthorized');
    }

    return Meteor.users.find({isRemoved: false}).count();
  }
});

UserMethods.getUserListPage = new CommonMethod({
  name: "UserMethods.getUserListPage",

  validate: new SimpleSchema({
    code: {
      type: Number
    },
    page: {
      type: Number
    },
    searchWord: {
      type: String,
      optional: true
    }
  }).validator(),

  run({code, page, searchWord}){
    if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
      throw new Meteor.Error('Unauthorized');
    }

    if(Meteor.isClient){
      return;
    }

    let search;
    if(searchWord){
      const reg = MongoLib.buildRegExp(searchWord);
      search = {$or: [
          {'profile.name': {$regex: reg}},
          {'profile.no': {$regex: reg}},
          {'profile.email': {$regex: reg}}
        ]};
    }else{
      search = {};
    }

    if(code){
      search.code = code;
    }
    search.isRemoved = false;

    const sort = {updatedAt: -1};

    return getPageData({
      page,
      search,
      sort,
      pageSize: Meteor.settings.public.pageSize,
      // @ts-ignore
      collection: Meteor.users,
      searchOption: {
        // @ts-ignore
        fields: {_id: 1, profile: 1, code: 1, createdAt: 1}
      }
    });
  }
});

/**
 * 사용자 삭제
 */
UserMethods.remove = new CommonMethod({
  name: "UserMethods.remove",

  validate: new SimpleSchema({
    _id: {
      type: String,
      regEx: SimpleSchema.RegEx.Id
    }
  }).validator(),

  run({_id}){
    if (Meteor.isServer) {
      if(!Roles.userIsInRole(this.userId, ['admin', 'manage-users'])){
        throw new Meteor.Error('Unauthorized');
      }

      if (Roles.userIsInRole(_id, ['super'])) {
        throw new Meteor.Error('Super user cannot be deleted');
      }

      Meteor.users.remove({_id});
    }
  }
});