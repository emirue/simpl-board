/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 : admin main layout
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminHeader from "./AdminHeader";

class AdminLayout extends React.Component<any, any>{
  render(): {} {
    const { children } = this.props;

    return (
      <Helmet>
        <AdminHeader/>
        <main className="main">
          {children}
        </main>
      </Helmet>
    );
  }
}

export default AdminLayout;
