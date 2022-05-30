import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
import { PageLoading } from '@/components/PageLoading';

export default (): React.ReactNode => {
  const token = localStorage.getItem('token');
  return (
    token ?
      <PageContainer>
        <Card>
          <Alert
            message=" hi ~ friend , welcome wintersir's site 😄"
            type="success"
            showIcon
            banner
            style={{ fontSize: 16 }}
          />
        </Card>
      </PageContainer> : <PageLoading />
  );
};
