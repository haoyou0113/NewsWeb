import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { Card } from 'antd';
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'title',
      content: 'content'
    };
  }

  render() {
    return (
      <Card title={this.state.title} style={{ width: '100%' }}>
        <div
          dangerouslySetInnerHTML={{ __html: this.state.content }}
          className='detail'
        ></div>
      </Card>
    );
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    axios
      .get('http://www.dell-lee.com/react/api/detail.json?id=' + id)
      .then(res => {
        const data = res.data.data;
        // 因为data本来就是个对象 和前面的格式一样
        this.setState(data);
      });
  }
}

export default Detail;
