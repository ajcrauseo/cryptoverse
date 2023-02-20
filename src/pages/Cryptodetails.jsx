import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from '../services/cryptoApi';
import { LineChart } from '../components';

const { Title, Text } = Typography;
const { Option } = Select;

const coinExample = {
  uuid: 'Qwsogvtv82FCd',
  symbol: 'BTC',
  name: 'Bitcoin',
  description:
    '<p>Bitcoin is the first digital currency that allows users to send and receive money, without the interference of a central bank or government. Instead, a network of thousands of peers is controlling the transactions; a decentralized system.</p>\n\n<h3>Why does bitcoin have value?</h3>\n\n<p>Bitcoin&rsquo;s useful qualities (decentralized, borderless, secure) aren&rsquo;t the only reason the coin is worth so much. Due to its scarcity (and it&rsquo;s hard to produce), Bitcoin is often nicknamed &lsquo;Digital Gold&rsquo;, in reference to &lsquo;classic&rsquo; physical gold. Like gold, Bitcoin also has a finite supply of coins available; there will only ever be 21 million bitcoin. And now you know why the creation of new bitcoins is also called mining.</p>\n\n<h3>No inflation in bitcoin</h3>\n\n<p>Bitcoin was invented in response to a few concerns the inventor(s) had, such as inflation. Its supply is limited, so one cannot just devalue the currency by printing more, as governments often do with fiat currencies (USD, EUR, etc.).</p>\n\n<p>As people look for alternative places to keep their money rather than losing value in a negative interest rate account, Bitcoin becomes more appealing. Big global companies, such as Tesla and MicroStrategy already purchased serious amounts of Bitcoin. And it&#39;s only a matter of time that other companies will follow. This also ensures that the value remains or continues to increase.</p>\n\n<h3>Who built Bitcoin</h3>\n\n<p>In 2008, Bitcoin was invented by an anonymous person or group named Satoshi Nakamoto. In 2009, Bitcoin was released as open-source software. Nakamoto&rsquo;s real identity is still unknown, although there are many theories about who it might be. Decentralization is one of Bitcoin&rsquo;s most important principles, and that&rsquo;s why this anonymity is perfectly in line.</p>\n\n<h3>The technology of Bitcoin</h3>\n\n<p>The Bitcoin blockchain is a database, the so-called &lsquo;ledger&rsquo;, that consists of bitcoin transaction records. For new transactions to be added to the ledger, the nodes must agree that the transaction is real and valid. The blockchain is public and contains records of all the transactions taking place.</p>\n\n<h3>How to buy bitcoin?</h3>\n\n<p>Continue reading <a href="https://coinranking.com/blog/how-to-buy-your-first-bitcoin/" rel="nofollow noopener" target="_blank">this blog article</a> on how to buy your first bitcoin.</p>\n',
  color: '#f7931A',
  iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
  websiteUrl: 'https://bitcoin.org',
  links: [
    {
      name: 'bitcoin.org',
      type: 'website',
      url: 'https://bitcoin.org',
    },
    {
      name: 'bitcoinmagazine.com',
      url: 'https://bitcoinmagazine.com/',
      type: 'website',
    },
    {
      name: 'bitcointalk.org',
      url: 'https://bitcointalk.org/',
      type: 'bitcointalk',
    },
    {
      name: 'blockchain.com',
      url: 'https://www.blockchain.com/explorer',
      type: 'explorer',
    },
    {
      name: 'bitcoin/bitcoin',
      url: 'https://github.com/bitcoin/bitcoin',
      type: 'github',
    },
    {
      name: 'r/bitcoin',
      url: 'https://www.reddit.com/r/bitcoin/',
      type: 'reddit',
    },
    {
      name: 'Bitcoin_Magazine',
      url: 'https://t.me/Bitcoin_Magazine',
      type: 'telegram',
    },
    {
      name: 'bitcoin',
      url: 'https://t.me/bitcoin',
      type: 'telegram',
    },
    {
      name: 'Bitcoin Whitepaper',
      url: 'https://bitcoin.org/bitcoin.pdf',
      type: 'whitepaper',
    },
  ],
  supply: {
    confirmed: true,
    supplyAt: 1669711321,
    max: '21000000',
    total: '19219662',
    circulating: '19219662',
  },
  numberOfMarkets: 4694,
  numberOfExchanges: 141,
  '24hVolume': '23528091995',
  marketCap: '477644278324',
  fullyDilutedMarketCap: '521888982481',
  price: '24851.856308629427',
  btcPrice: '1',
  priceAt: 1676828760,
  change: '0.71',
  rank: 1,
  sparkline: [
    '24722.35853072726',
    '24712.11145878796',
    '24656.50817396836',
    '24671.414246185886',
    '24682.915476643757',
    '24708.226162732837',
    '24743.39418520415',
    '24777.839644922784',
    '24766.540155100978',
    '24768.180274944374',
    '24777.871181038125',
    '24816.887039514942',
    '24796.47615675559',
    '24746.110760447013',
    '24680.378897897288',
    '24649.00915260064',
    '24665.009169377394',
    '24723.279202740057',
    '24733.46533153827',
    '24763.477837509454',
    '24783.90590952215',
    '24848.237682028717',
    '24921.448115986466',
    '25094.52571501309',
    '24901.38927757508',
  ],
  allTimeHigh: {
    price: '68763.41083248306',
    timestamp: 1636502400,
  },
  coinrankingUrl: 'https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc',
  tier: 1,
  lowVolume: false,
  listedAt: 1330214400,
  hasContent: true,
  notices: null,
  tags: ['layer-1', 'proof-of-work'],
};

const Cryptodetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isFetchingHistory } =
    useGetCryptoHistoryQuery({
      coinId,
      timePeriod,
    });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 'Loading...';

  const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

  const stats = [
    {
      title: 'Price to USD',
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: '24h Volume',
      value: `$ ${
        cryptoDetails['24hVolume'] && millify(cryptoDetails['24hVolume'])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: 'Market Cap',
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: 'All-time-high(daily avg.)',
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: 'Number Of Markets',
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: 'Number Of Exchanges',
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: 'Aprroved Supply',
      value: cryptoDetails.supply.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Total Supply',
      value: `$ ${millify(cryptoDetails.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: 'Circulating Supply',
      value: `$ ${millify(cryptoDetails.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars. View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select Time Period'
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </Select>

      {/*********************  Line Chart *********************/}
      <LineChart
        coinHistory={coinHistory}
        isFetchingHistory={isFetchingHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
      />

      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name}</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats' key={title}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats.info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats' key={title}>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default Cryptodetails;
