import React, { useCallback } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { AuthService } from '@/utils/auth';
const authService: AuthService = new AuthService();

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {

  const user = localStorage.getItem('user');
  const currentUser = user ? JSON.parse(user || "") : null;

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        localStorage.removeItem('init');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        authService.logout();
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!user) {
    return loading;
  }

  if (!currentUser || !currentUser.userName) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{currentUser.userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
