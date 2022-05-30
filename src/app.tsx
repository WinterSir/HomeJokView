import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@/components/PageLoading';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { AuthService } from '@/utils/auth';

const isDev = process.env.NODE_ENV === 'development';

const authService: AuthService = new AuthService();

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
    loading: <PageLoading />
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
}> {
    const init = localStorage.getItem('init');
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token && !init && !user) {
        localStorage.setItem('init', 'true');
        authService.login();
    }
    return {
        settings: {}
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
        rightContentRender: () => <RightContent />,
        disableContentMargin: false,
        waterMarkProps: {
            //content: initialState?.currentUser?.name,
        },
        // footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            if (!token && !user && location.pathname.indexOf("/callback") < 0) {
                authService.login();
            }
        },
        links: isDev
            ? [
                <Link to="/umi/plugin/openapi" target="_blank">
                    <LinkOutlined />
                    <span>OpenAPI 文档</span>
                </Link>,
                <Link to="/~docs">
                    <BookOutlined />
                    <span>业务组件文档</span>
                </Link>,
            ]
            : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        ...initialState?.settings,
        //防止未登录闪屏菜单问题
        pure: token ? false : true
    }
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
    const token = localStorage.getItem('token');
    const authHeader = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };
    return {
        url: `${url}`,
        options: { ...options, interceptors: true, headers: authHeader },
    };
};
export const request: RequestConfig = {
    //timeout: 10000,
    // 新增自动添加AccessToken的请求前拦截器
    requestInterceptors: [authHeaderInterceptor],
};
