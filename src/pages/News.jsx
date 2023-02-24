import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { Loader } from '../components';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery();

  if (!cryptoNews) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {/* {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => console.log(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
          </Select>
        </Col>
      )} */}
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <Title className='news-title' level={4}>
                {news.title}
              </Title>
              <div className='news-image-container'>
                {/* <img
                  src={demoImage}
                  alt='News Demo Image'
                  className='news-image'
                /> */}
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className='provider-container'>
                <div>
                  <Text className='provider-name'>
                    <b>Source:</b> Coindesk
                  </Text>
                </div>
                <Text italic>{moment(news.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
