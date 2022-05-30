import { request } from 'umi';
export async function login(payload: { account: string }, options?: { [key: string]: any }) {
    return request('/api/Account/Login', {
        method: 'POST',
        params: payload,
        ...(options || {}),
    });
}