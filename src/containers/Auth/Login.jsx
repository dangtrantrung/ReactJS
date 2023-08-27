import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import * as actions from '../../store/actions'
import { FormattedMessage } from 'react-intl'

import './Login.scss'
import { truncate } from 'lodash'
import { handleLoginAPI } from '../../services/userService'
import { userLoginSucess } from '../../store/actions'

class Login extends Component {
  constructor(props) {
    super(props)
    // this.btnLogin = React.createRef();
    this.state = {
      username: 'hoidanit',
      password: '123',
      isShowPassword: false,
      errMessage: '',
    }
  }
  handleOnChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    })
    console.log(event.target.value)
  }
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
    console.log(event.target.value)
  }
  handleLogin = async () => {
    /* alert('hoi dan it') */
    this.setState({
      errMessage: '',
    })
    console.log(
      'username: ',
      this.state.username,
      ' password: ',
      this.state.password,
    )
    console.log('all states: ', this.state)
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password)
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message })
      }
      if (data && data.errCode === 0) {
        this.setState({ errMessage: 'Succesfull login' })
        //TODO...login success with Redux - Store - Action Redux...
        // sủ dụng redux store action để lưu thông tin user login success tại local storage
        this.props.userLoginSucess(data.user)
      }
    } catch (error) {
      //console.log(error)
      //get http error from axios
      if (error.response) {
        console.log(error.response)
        if (error.response.data) {
          this.setState({ errMessage: error.response.data.message })
        }
      }
    }
  }
  handleShowHidePassword = () => {
    //alert('click me')
    this.setState({ isShowPassword: !this.state.isShowPassword })
  }
  render() {
    //JSX code JS trong HTML - convert html ->JSX -<-
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Username"
                value={this.state.username}
                onChange={(event) => {
                  this.handleOnChangeUserName(event)
                }}
              ></input>
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your Password"
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangePassword(event)
                  }}
                ></input>
                <span
                  onClick={() => {
                    this.handleShowHidePassword()
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: 'red' }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 text-center">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin()
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login ">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    //userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSucess: (userInfo) => dispatch(actions.userLoginSucess(userInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
