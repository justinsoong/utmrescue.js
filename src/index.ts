class UtmRescue {
  private static readonly COOKIE_NAME = "__utmrescue_data";
  private static readonly COOKIE_EXPIRATION_DAYS = 30;
  private static readonly UTM_KEYS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];

  private utmParams: { [key: string]: string } = {};

  constructor() {
    this.extractUtmParams();
    this.storeUtmParams();
  }

  private extractUtmParams(): void {
    const urlParams = new URLSearchParams(window.location.search.toLowerCase());
    const storedParams = this.getStoredUtmParams();

    UtmRescue.UTM_KEYS.forEach((key) => {
      const value = urlParams.get(key);
      if (value && !storedParams[key]) {
        this.utmParams[key] = value.toLowerCase();
      } else if (storedParams[key]) {
        this.utmParams[key] = storedParams[key];
      }
    });
  }

  private storeUtmParams(): void {
    const storedParams = this.getStoredUtmParams();
    const newParams = { ...storedParams, ...this.utmParams };

    if (Object.keys(newParams).length > 0) {
      const cookieValue = JSON.stringify(newParams);
      const expirationDate = new Date();
      expirationDate.setDate(
        expirationDate.getDate() + UtmRescue.COOKIE_EXPIRATION_DAYS
      );

      document.cookie = `${UtmRescue.COOKIE_NAME}=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/; domain=${this.getParentDomain()}; SameSite=Lax`;
    }
  }

  private getParentDomain(): string {
    const hostParts = window.location.hostname.split(".");
    return hostParts.slice(-2).join(".");
  }

  public getUtmParams(): { [key: string]: string } {
    return { ...this.utmParams };
  }

  private getStoredUtmParams(): { [key: string]: string } {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === UtmRescue.COOKIE_NAME) {
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (e) {
          console.error("Error parsing stored UTM parameters:", e);
        }
      }
    }
    return {};
  }
}

export default UtmRescue;
