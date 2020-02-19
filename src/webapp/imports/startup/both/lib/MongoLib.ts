/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : mongodb library
 */

import {Mongo} from 'meteor/mongo';

const MongoLib = {
  query: {
    checkExists(collection: Mongo.Collection<any>, query: object): boolean {
      return collection.find(query, {limit: 1}).count() >= 1;
    },
  },
  buildRegExp(searchText: string): RegExp {
    searchText = searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    return new RegExp("(" + searchText + ")", "ig");
  },
};

export default MongoLib;
