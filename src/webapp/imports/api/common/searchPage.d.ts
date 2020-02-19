/**
 * 제작 : emirue
 * 날짜 : 2020/02/20
 * 내용 : paging 용 interface 정의
 */

import {Mongo} from 'meteor/mongo';

export interface ICollection extends Mongo.Collection<any>{
  _name: string;
  aggregate?: any;
}
export interface ISearchOption {
  skip?: number;
  limit?: number;
  sort?: object;
  reactive?: boolean;
  disableOplog?: boolean;
}

export interface IPage {
  page: number;
  pageSize: number;
  collection: ICollection;
  search: any;
  searchFieldName?: string;
  searchOption: ISearchOption;
  fields?: any;
  sort: any
}

export interface IPageResult {
  cursor?: Mongo.Cursor<any>;
  totalCount: number;
  totalPage: number;
  list?: any
}
