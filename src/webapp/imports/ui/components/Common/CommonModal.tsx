/**
 * 제작 : emirue
 * 날짜 : 2020/02/22
 * 내용 : common modal
 */

import {Tracker} from "meteor/tracker";
import { Session } from 'meteor/session';
import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ModalLib from "../../../startup/client/common/ModalLib";
import { ICommonModalState } from '../../../startup/client/common/ModalLib';

class CommonModal extends React.Component<any, ICommonModalState>{
  state: ICommonModalState = {
    show: false,
    title: '',
    message: '',
    okCallback: null,
    cancelCallback: null,
  };

  componentDidMount(): void {
    Tracker.autorun(() => {
      const data = Session.get('commonModal');
      if (data) {
        this.setState({
          show: true,
          title: data.title,
          message: data.message,
        });
      }
    });
  }

  private handleClose(position) {
    if (position) {
      if (position === 'ok' && ModalLib.okCallback) {
        ModalLib.okCallback();
      } else if (position === 'cancel' && ModalLib.cancelCallback) {
        ModalLib.cancelCallback();
      }
    }
    this.setState({
      show: false,
    });
  }

  public render(): JSX.Element {
    const {
      show,
      title,
      message,
      okCallback,
      cancelCallback,
    } = this.state;

    return (
      <>
        <Modal show={show} onHide={this.handleClose.bind(this)} animation={true}>
          {title &&
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          }
          <Modal.Body>{message}</Modal.Body>
          <Modal.Footer>
            {okCallback ?
              <Button variant="primary" onClick={this.handleClose.bind(this, 'ok')}>OK</Button> :
              <Button onClick={this.handleClose.bind(this, 'ok')}>Close</Button>}
            {cancelCallback && <Button variant="secondary" onClick={this.handleClose.bind(this, 'cancel')}>Cancel</Button>}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default CommonModal;
