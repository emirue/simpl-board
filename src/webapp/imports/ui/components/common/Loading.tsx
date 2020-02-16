/**
 * 제작 : emirue
 * 날짜 : 2020/02/16
 * 내용 :
 */
import * as React from "react";

export default function Loading (props) {
  if (props.error) {
    return <div>Error!</div>
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}
