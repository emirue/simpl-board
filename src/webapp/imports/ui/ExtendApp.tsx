/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 :
 */

import * as React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonModal from "./components/Common/CommonModal";

function ExtendApp(): JSX.Element {
  toast.configure({
    autoClose: 1500,
  });

  return (
    <>
      <ToastContainer/>
      <CommonModal/>
    </>
  );
}

export default ExtendApp;
