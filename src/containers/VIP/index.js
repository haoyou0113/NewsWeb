import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './style.css';

class Vip extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true, fetchFinish: false };
    // 防止展示内容后跳转 获取全部数据后渲染
  }
  render() {
    if (this.state.login) {
      if (this.state.fetchFinish) {
        return <div className='vip'>vip</div>;
      } else {
        return <div className='vip'>Being parsed</div>;
      }
    } else {
      return <Redirect to='/'></Redirect>;
    }
  }
  componentDidMount() {
    axios
      .get('http://www.dell-lee.com/react/api/isLogin.json', {
        withCredentials: true
      })
      .then(res => {
        const login = res.data.data.login;

        this.setState({ login: login, fetchFinish: true });
      });
  }
}

export default Vip;
