/**
 * 제작 : emirue
 * 날짜 : 2020/02/19
 * 내용 :
 */

import * as React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from "meteor/tracker";
import Loading from '../Common/Loading';

class Logout extends React.Component<any, any> {
  constructor(props) {
    super(props);

    Meteor.logout();
  }

  componentDidMount(): void {
    Tracker.autorun(() => {
      const currentUserId = Meteor.userId();
      if (!currentUserId) {
        this.props.history.push('/');
      }
    });
  }

  public render(): JSX.Element {
    return (
      <Loading />
    );
  }
}

export default Logout;
