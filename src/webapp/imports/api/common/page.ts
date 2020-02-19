/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : paging library
 */

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import * as _ from 'lodash';
import { IPage, IPageResult } from './searchPage';

function getResult(cursor: Mongo.Cursor<any>, pageSize: number): IPageResult {
  const totalCount: number = cursor.count();
  const totalPage: number = Math.ceil(totalCount / pageSize);
  return {
    cursor,
    totalCount,
    totalPage,
  };
}

/**
 * 일반 페이지 검색
 * @param page
 * @param pageSize
 * @param collection
 * @param search
 * @param searchOption
 * @param sort
 * @returns {{totalPage: number, totalCount: *, list: []}|{totalPage: number, totalCount: number, list: null}|{totalPage: number, totalCount: *, list: *}}
 */
export const getPageData = function ({
                                       page,
                                       pageSize,
                                       collection,
                                       search = {},
                                       searchOption = {},
                                       sort = {}
                                     }: IPage): IPageResult {
  try {
    if(page < 1){
      throw new Meteor.Error('Page Error:' + collection._name);
    }
    if(pageSize > 100){
      throw new Meteor.Error('Page Size Limit Error (100):' + collection._name);
    }

    searchOption.skip = (page - 1) * pageSize;
    searchOption.limit = pageSize;
    searchOption.sort = sort;
    searchOption.reactive = false;
    searchOption.disableOplog = true;
    const cursor: Mongo.Cursor<any> = collection.find(search, searchOption);
    const {
      totalCount,
      totalPage,
    } = getResult(cursor, pageSize);
    if(page !== 1 && page > totalPage){
      throw new Meteor.Error('Page Error:' + collection._name);
    }else if(page === 1 && totalPage === 0){
      return {
        totalCount, totalPage, list: []
      };
    }

    return {
      totalCount,
      totalPage,
      list: cursor.fetch()
    };
  } catch (e) {
    console.warn(`[getPageData - ERROR] ${e.message}`);
    return {
      totalCount: 0,
      totalPage: 0,
      list: null
    }
  }
};

/**
 * 특정 필드 배열값에서의 검색이 필요한 경우의 페이징
 * @param page
 * @param pageSize
 * @param collection
 * @param search
 * @param searchFieldName
 * @param fields
 * @param sort
 * @returns {Promise<{totalPage: number, totalCount: *, list: []}|{totalPage: number, totalCount: number, list: null}|{totalPage: number, totalCount: *, list: any}>}
 */
export const getAggregatePageData = async function ({
                                                      page,
                                                      pageSize,
                                                      collection,
                                                      search = {},
                                                      searchFieldName = '',
                                                      fields = {},
                                                      sort = {},
                                                    }: IPage): Promise<IPageResult> {
  try {
    if(page < 1){
      throw new Meteor.Error('Page Error:' + collection._name);
    }
    if(pageSize > 100){
      throw new Meteor.Error('Page Size Limit Error (100):' + collection._name);
    }

    const group = {};
    const fieldsKeys = Object.keys(fields);
    _.forEach(fieldsKeys, (f) => {
      group[f] = (f === '_id') ? `$${f}` : { $first: `$${f}` }
    });
    if (searchFieldName) group[searchFieldName] = { $push: `$${searchFieldName}` };

    const list = await collection.aggregate([{
      $unwind: `$${searchFieldName}`
    }, {
      $match: search
    }, {
      $group: group
    }, {
      $project: _.extend(fields, {
        numberOfFields: {
          $cond: {
            if: { $isArray: `$${searchFieldName}` },
            then: {$size: `$${searchFieldName}` },
            else: 0
          }
        }
      }),
    }, {
      $sort: sort,
    }, {
      $skip: (page - 1) * pageSize,
    }, {
      $limit: pageSize,
    }], {
      allowDiskUse: true,
    }).toArray();

    const cursor: Mongo.Cursor<any> = collection.find(search);
    const {
      totalCount,
      totalPage,
    } = getResult(cursor, pageSize);
    if(page !== 1 && page > totalPage){
      throw new Meteor.Error('Page Error:' + collection._name);
    }else if(page === 1 && totalPage === 0){
      return {
        totalCount, totalPage, list: []
      };
    }

    return {
      totalCount,
      totalPage,
      list,
    };
  } catch (e) {
    console.warn(`[getPageData - ERROR] ${e.message}`);
    return {
      totalCount: 0,
      totalPage: 0,
      list: null
    }
  }
};
