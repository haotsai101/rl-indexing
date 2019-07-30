import { docCookies } from './docCookies';
import { FamilySearch, FamilySearchX, FSInitOptions } from './FamilySearchX';

const TOKEN_LENGTH = 3600; //86400

export interface FsSession {
    admin: boolean;
    exp: number;
    fs_access_token: string;
    fs_user: {
        displayName: string;
        email: string;
        pid: string;
    }
    iat: number
}

export class FHTLX extends FamilySearchX{

    private saveAccessToken: boolean;
    private accessToken: string;
    private tokenCookie: string;
    private tokenCookiePath: string;

    readonly PARENT_DOMAIN: string = '';//".fhtl.byu.edu";


    public static authServiceRedirect(redirectUri: string): void{
        FamilySearchX.uploadConfig(redirectUri, (options: FSInitOptions) => {
            let request = new XMLHttpRequest();
            let uri = "https://auth.fhtl.byu.edu/?redirect=" + options.redirectUri;
            request.open("GET", uri);
            request.send();
        }, (error: any) => {

        })
    }

    public static finishAuthService(configLocation: string, callback: (fhtlx: FHTLX) => void, failureUri?: string): void{
        let accessToken: string = null;

        if(accessToken = localStorage.getItem("fs_access_token")){
            // accessToken = window.location.href.split("fstoken=")[1];
            // console.log("Access Token:", accessToken);
        }

        FamilySearchX.uploadConfig(configLocation, (initOptions) => {

            let fhtlx = new FHTLX(initOptions);

            // If we already have the token, set it in the cookie.
            if(accessToken){
                fhtlx.setAccessToken(accessToken);
            }
            

            let verifyToken = (error: any, response: any) => {
                if(!!error){
                    console.error("Could not obtain auth token.");
                }
                else{
                    callback(fhtlx);
                }
            };
            if(fhtlx.getAccessToken() as any){
                callback(fhtlx);
            }
            else if(!(fhtlx.oauthResponse(verifyToken) as any) && failureUri){
                (window as any).location = failureUri;
            }

        }, (error: any) => {
            console.error("err:", error);
            // window.location = 'login';
            if(failureUri){
                (window as any).location = failureUri;
            }
        });
    }

    public setAccessToken(accessToken: string): FamilySearch {
        this.accessToken = accessToken;
        if(this.saveAccessToken){
            // Expire in 24 hours because tokens never last longer than that, though
            // they can expire before that after 1 hour of inactivity.
            docCookies.setItem(this.tokenCookie, accessToken, TOKEN_LENGTH, this.tokenCookiePath, this.PARENT_DOMAIN);
        }
        return this;
    }

    public assignAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public storeSession(fsSession: FsSession) {
        this.setAccessToken(fsSession.fs_access_token);
        docCookies.setItem('FS_SESSION', JSON.stringify(fsSession), TOKEN_LENGTH, this.tokenCookiePath, this.PARENT_DOMAIN);
    }

    public readyAccessToken(fsSession: FsSession): void {
        this.accessToken = fsSession.fs_access_token;
        this.userPID = fsSession.fs_user.pid;
    }

    public deleteSession(): void {
        this.deleteAccessToken();
        docCookies.removeItem('FS_SESSION', this.tokenCookiePath, this.PARENT_DOMAIN);
    }

    public static checkAccessToken(): FsSession {
        let sessionStr = docCookies.getItem('FS_SESSION');
        if (!!sessionStr) {
            try {
                let fsSession: FsSession = JSON.parse(sessionStr);
                return fsSession;
            } catch (err) {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

}