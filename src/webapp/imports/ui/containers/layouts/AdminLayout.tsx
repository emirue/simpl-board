/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 : admin main layout
 */

import * as React from 'react';
import AdminHeader from "../../containers/layouts/AdminHeader";
import '../../stylesheets/admin.scss';

class AdminLayout extends React.Component<any, any>{
  render(): {} {
    const { children } = this.props;

    return (
      <>
        <AdminHeader/>
        <main className="main">
          {children}
        </main>
      </>
    );
  }
}

export default AdminLayout;
