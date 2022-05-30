import { Log, User, UserManager } from 'oidc-client';

export class AuthService {
    public userManager: UserManager;
    constructor() {
        // const clientRoot = 'http://localhost:8000/';
        const clientRoot = 'https://homejok.wintersir.com/';        
        const settings = {
            authority: 'https://login.wintersir.com',
            //client_id: 'antdview',
            //response_type: 'id_token token',
            client_id: 'antdviewcode',
            client_secret: 'antdviewcode',
            response_type: 'code',
            redirect_uri: `${clientRoot}callback`,
            post_logout_redirect_uri: `${clientRoot}`,
            // silent_redirect_uri: `${clientRoot}silent-renew.html`,
            scope: 'openid profile HomeJokScope'
        };
        this.userManager = new UserManager(settings);

        Log.logger = console;
        Log.level = Log.WARN;
    }

    public login(): Promise<void> {
        //记录跳转登录前的路由
        return this.userManager.signinRedirect({ state: window.location.href });
    }

    public signinRedirectCallback(): Promise<User> {
        return this.userManager.signinRedirectCallback();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public renewToken(): Promise<User> {
        return this.userManager.signinSilent();
    }
}