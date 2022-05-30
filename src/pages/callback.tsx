import { message, Result, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { AuthService } from '@/utils/auth';
import { useRequest } from 'umi';
import { login } from '@/services/accountService';

const authService: AuthService = new AuthService();

const callback: React.FC = () => {
    const [msg, setMsg] = useState('玩命登录中......');
    const authRedirect = useRef("/");
    const { run, loading } = useRequest(login, {
        manual: true,
        onSuccess: (result, params) => {
            console.log(result);
            if (result && result.responseData) {
                localStorage.setItem('user', JSON.stringify(result.responseData));
                window.location.href = authRedirect.current;
            } else {
                setMsg('登录失败，即将跳转重新登录......');
                setTimeout(() => {
                    localStorage.removeItem('init');
                    localStorage.removeItem('token');
                    window.location.href = authRedirect.current;
                }, 3000);
            }
        },
        onError: (error) => {
            console.log(error);
            message.error(error.message);
        }
    });
    useEffect(() => {
        authService.signinRedirectCallback().then(auth => {
            authRedirect.current = auth.state;
            localStorage.setItem('token', auth.access_token);
            run({ account: auth.profile.sub });
        })
    }, [])

    return (
        <>
            <Result status="success" title={<Spin spinning={loading} tip={msg}></Spin>} />
        </>
    )
};

export default callback;
