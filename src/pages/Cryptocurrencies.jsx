import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const example = {
  uuid: 'Qwsogvtv82FCd',
  symbol: 'BTC',
  name: 'Bitcoin',
  color: '#f7931A',
  iconUrl: 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
  marketCap: '462965775417',
  price: '24088.133049243268',
  listedAt: 1330214400,
  tier: 1,
  change: '-3.05',
  rank: 1,
  sparkline: [
    '24870.46481156634',
    '24932.6842734925',
    '24906.672941776593',
    '24717.35260503502',
    '24604.008009598787',
    '24363.19397260611',
    '23981.099583015308',
    '23742.673030105434',
    '23761.133563602143',
    '23809.83608597105',
    '23839.995991906388',
    '23817.31469194759',
    '23783.987397063906',
    '23746.885889591325',
    '23749.176990691332',
    '23687.426494254243',
    '23744.0034138684',
    '23737.025271027705',
    '23758.94598807176',
    '23798.656546338665',
    '23846.946298236322',
    '23821.78426616641',
    '23935.769287609524',
    '24052.932333475048',
    '24086.716519258727',
  ],
  lowVolume: false,
  coinrankingUrl: 'https://coinranking.com/coin/Qwsogvtv82FCd+bitcoin-btc',
  '24hVolume': '37384323415',
  btcPrice: '1',
};

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading...';

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className='crypto-card'
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)} USD</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
