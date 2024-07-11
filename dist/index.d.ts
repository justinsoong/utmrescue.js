declare class UtmRescue {
    private static readonly COOKIE_NAME;
    private static readonly COOKIE_EXPIRATION_DAYS;
    private static readonly UTM_KEYS;
    private utmParams;
    constructor();
    private extractUtmParams;
    private storeUtmParams;
    private getParentDomain;
    getUtmParams(): {
        [key: string]: string;
    };
    private getStoredUtmParams;
}
export default UtmRescue;
