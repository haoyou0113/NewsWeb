import React, { Component, Fragment } from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import { Menu, Icon } from 'antd';

class AppHeader extends Component {
  getMenuItems() {
    return this.state.list.map(item => {
      return (
        <Menu.Item key={item.id}>
          <Link to={`/${item.id}`}>
            <Icon type={item.icon} />
            {item.title}
          </Link>
        </Menu.Item>
      );
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }
  componentDidMount() {
    axios.get('http://www.dell-lee.com/react/api/header.json').then(res => {
      this.setState({ list: res.data.data });
    });
  }
  render() {
    return (
      <Fragment>
        <Link to='/'>
          <img alt='img' src={logo} className='app-header-logo' />
        </Link>

        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode='horizontal'
          className='app-header-menu'
        >
          {this.getMenuItems()}
        </Menu>
      </Fragment>
    );
  }
}
export default AppHeader;
