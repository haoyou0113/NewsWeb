import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { Button } from 'antd';
import { Modal, Input, message } from 'antd';
class Login extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.checkLogout = this.checkLogout.bind(this);

    this.state = {
      login: false,
      modal: false,
      user: '',
      password: ''
    };
  }
  showModal() {
    this.setState({ modal: true });
  }
  hideModal() {
    this.setState({ modal: false });
  }
  changeUser(e) {
    this.setState({ user: e.target.value });
  }
  changePassword(e) {
    this.setState({ password: e.target.value });
  }
  checkLogout() {
    axios
      .get('http://www.dell-lee.com/react/api/logout.json', {
        withCredentials: true
      })
      .then(res => {
        const data = res.data.data;
        if (data.logout) {
          this.setState({ login: false });
        }
        this.props.history.push('/');
        // 退出以后跳回首页
      });
  }
  checkLogin(e) {
    const { user, password } = this.state;
    const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
    // 把用户名和密码带给接口
    console.log(e.keyCode);
    axios.get(url, { withCredentials: true }).then(res => {
      // withCredentials 防止刷新取消登录
      const login = res.data.data.login;
      if (login) {
        message.success('Login success');
        this.setState({ login: true, modal: false });
      } else {
        message.error('Wrong username or password');
      }
    });
  }
  render() {
    const { login } = this.state;
    return (
      <div className='login'>
        {login ? (
          <Button type='primary' onClick={this.checkLogout}>
            logout
          </Button>
        ) : (
          <Button type='primary' onClick={this.showModal}>
            Login
          </Button>
        )}
        <Link to='/vip'>
          <Button type='primary' style={{ marginLeft: 10 }}>
            VIP
          </Button>
        </Link>
        <Modal
          title='Login'
          visible={this.state.modal}
          onOk={this.checkLogin}
          onCancel={this.hideModal}
        >
          <Input
            placeholder='Please input yor username'
            style={{ marginBottom: 10 }}
            value={this.state.user}
            onChange={this.changeUser}
          />
          <Input
            placeholder='please input your password'
            type='password'
            value={this.state.password}
            onChange={this.changePassword}
          />
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
      })
      .then(res => {
        const login = res.data.data.login;
        this.setState({ login: login });
      });
  }
}

export default withRouter(Login);
// 利用withrouter 似的子组件获取路由信息 路由跳转
