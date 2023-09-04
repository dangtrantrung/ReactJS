import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
class ModalUser extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  //call parent toggle function from child component
  toggle = () => {
    //alert(' me Toggle')
    this.props.toggleFromParent() //call a child prop = call parent function
  }

  render() {
    console.log('check child props', this.props)
    console.log(' check child modal open', this.props.isOpen)
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        fullscreen
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        size="lg"
        centered
        className={'modal-user-container'} // bọc class để css cho riêng modal này trong file scss,..
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label> Email</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label> Password</label>
              <input type="password"></input>
            </div>
            <div className="input-container">
              <label> First Name</label>
              <input type="text"></input>
            </div>
            <div className="input-container">
              <label> Last Name</label>
              <input type="text"></input>
            </div>
            <div className="input-container max-width">
              <label> Address</label>
              <input type="text"></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className ="px-3"onClick={() => this.toggle()}>
            Save Changes
          </Button>{' '}
          <Button color="secondary" onClick={() => this.toggle()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser)
