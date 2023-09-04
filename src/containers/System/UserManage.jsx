import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserManage.scss'
import { getAllUserAPI } from '../../services/userService'

import ModelUser from './ModalUser'
class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = { arrUsers: [], isOpenModalUser: false }
  }

  handleAddNewUser = () => {
    //alert('click me')
    this.setState({ isOpenModalUser: true })
  }
  // pass a function from parent to child component
  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser })
  }

  /* Life Circle
        Run component
        1.run constructor -> init state
        1.1 Update state... when parent component change states,..
        2. did mount (set states...) did born died - unmount,...
        3. Render re-render set state,...component many times - didmount - only one times
        4...
         */

  async componentDidMount() {
    let resData = await getAllUserAPI('ALL')
    if (resData && resData.errCode === 0) {
      //console.log('get all user from NodeJS', resData)
      //this.setState re-render agian component
      this.setState(
        {
          arrUsers: resData.users,
        },
        () => {
          console.log('get all user from NodeJS', this.state.arrUsers)
        },
      )
      console.log('get all user from NodeJS', this.state.arrUsers)
    }
  }

  render() {
    console.log('check render:', this.state)
    let arrUsers = this.state.arrUsers
    return (
      <div className="users-container">
        <ModelUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          test="abc"
          fullscreen
        />
        <div className="title text-center"> Manage users </div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"> </i>Add new User
          </button>
        </div>
        <div className="users-table mt-3 mx-3">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
