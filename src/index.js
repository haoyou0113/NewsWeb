import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AppHeader from './Components/Header';
import List from './containers/List';
import Detail from './containers/Detail';
import Login from './containers/login';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './style.css';

const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {' '}
        <Layout style={{ minWidth: 1300, height: '100%' }}>
          <Header className='header'>
            <AppHeader />
          </Header>
          <Content className='content'>
            <Login />
            <Switch>
              <Route path='/detail/:id' component={Detail} />
              {/* /:id 进入下一页面所带的参数 */}
              <Route path='/:id?' component={List} />
              {/* id?表示id 可有可无 */}
            </Switch>
          </Content>
          <Footer className='footer'>@CopyRight2019 LeonHao</Footer>
        </Layout>{' '}
      </BrowserRouter>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
