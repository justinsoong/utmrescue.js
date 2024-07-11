import { UtmRescue } from "../src/utmrescue";

describe("UtmRescue", () => {
  let originalLocation: Location;

  beforeEach(() => {
    originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = {
      ...originalLocation,
      search: "",
      hostname: "example.com",
    };
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "",
    });
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  test("should extract UTM parameters from URL when no stored parameters exist", () => {
    window.location.search =
      "?utm_source=test&utm_medium=email&UTM_CAMPAIGN=summer2023";
    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual({
      utm_source: "test",
      utm_medium: "email",
      utm_campaign: "summer2023",
    });
  });

  test("should not override stored UTM parameters with new URL parameters", () => {
    const storedParams = { utm_source: "original", utm_medium: "original" };
    document.cookie = `_utmrescue_data=${encodeURIComponent(JSON.stringify(storedParams))}; path=/; domain=example.com; SameSite=Lax`;

    window.location.search = "?utm_source=new&utm_medium=new&utm_campaign=new";
    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual({
      utm_source: "original",
      utm_medium: "original",
      utm_campaign: "new",
    });
  });

  test("should add new UTM parameters to existing stored parameters", () => {
    const storedParams = { utm_source: "original" };
    document.cookie = `_utmrescue_data=${encodeURIComponent(JSON.stringify(storedParams))}; path=/; domain=example.com; SameSite=Lax`;

    window.location.search = "?utm_medium=new&utm_campaign=new";
    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual({
      utm_source: "original",
      utm_medium: "new",
      utm_campaign: "new",
    });
  });

  test("should store UTM parameters in cookie", () => {
    window.location.search = "?utm_source=test&utm_medium=email";
    new UtmRescue();

    expect(document.cookie).toContain("_utmrescue_data=");
    expect(document.cookie).toContain(
      encodeURIComponent(
        JSON.stringify({
          utm_source: "test",
          utm_medium: "email",
        })
      )
    );
  });

  test("should handle case-insensitive UTM parameters", () => {
    window.location.search = "?UTM_SOURCE=Test&utm_MEDIUM=Email";
    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual({
      utm_source: "test",
      utm_medium: "email",
    });
  });

  test("should retrieve UTM parameters from cookie", () => {
    const storedParams = { utm_source: "cookie", utm_campaign: "stored" };
    document.cookie = `_utmrescue_data=${encodeURIComponent(JSON.stringify(storedParams))}; path=/; domain=example.com; SameSite=Lax`;

    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual(storedParams);
  });

  test("should handle empty UTM parameters", () => {
    const utmRescue = new UtmRescue();
    const params = utmRescue.getUtmParams();

    expect(params).toEqual({});
  });
});
