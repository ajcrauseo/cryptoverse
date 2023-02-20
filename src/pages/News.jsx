import React, { useState } from 'react';
import { Select, Typography, Row, Col, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';

const { Text, Title } = Typography;
const { Option } = Select;

const example = {
  date: 'Fri, 17 Feb 2023 22:32:17 +0000',
  description: 'It wasn’t immediately clear what prompted the rally.',
  title:
    'Filecoin’s FIL Token Jumps More Than 30%, Sparking Interest in Virtual Machine Launch ',
  url: 'https://www.coindesk.com/business/2023/02/17/filecoins-fil-token-jumps-more-than-30-sparking-interest-in-virtual-machine-launch/?utm_medium=referral&utm_source=rss&utm_campaign=headlines',
};

const News = ({ simplified }) => {
  // const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery();

  if (!cryptoNews) return 'Loading...';

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
