import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const { Item } = Menu;

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to='/' onClick={() => setActiveMenu(!activeMenu)}>Home</Link>,
    },
    {
      key: 'cryptocurrencies',
      icon: <FundOutlined />,
      label: <Link to='/cryptocurrencies' onClick={() => setActiveMenu(!activeMenu)}>Cryptocurrencies</Link>,
    },
    {
      key: 'news',
      icon: <BulbOutlined />,
      label: (
        <Link to='/news' onClick={() => setActiveMenu(!activeMenu)}>
          News
        </Link>
      ),
    },
  ];

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size='large' />
        <Typography.Title level={2} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>
        <Button
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {/* {activeMenu && (
        <Menu theme='dark'>
          <Item icon={<HomeOutlined />} key='home'>
            <Link to='/'>Home</Link>
          </Item>
          <Item icon={<FundOutlined />} key='cryptocurrencies'>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Item>
          <Item icon={<MoneyCollectOutlined />} key='exchanges'>
            <Link to='/exchanges'>Exchanges</Link>
          </Item>
          <Item icon={<BulbOutlined />} key='news'>
            <Link to='/news'>News</Link>
          </Item>
        </Menu>
      )} */}

      {activeMenu && <Menu items={menuItems} theme='dark' />}
    </div>
  );
};

export default Navbar;
