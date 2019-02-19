import browser from "webextension-polyfill";

import Settings from "../utils/settings";
import { SETTINGS_KEY } from "../utils/constants";

export default class Badge {
  constructor() {
    this.settings = new Settings();

    this.badgeText = "";
  }

  getBadgeText() {
    return this.badgeText;
  }

  _setBadgeText(text, backgroundColor) {
    // Try-catch because Firefox Android lacks badge support
    try {
      browser.browserAction.setBadgeText({ text });
      browser.browserAction.setBadgeTextColor({ color: "white" });
      browser.browserAction.setBadgeBackgroundColor({ color: backgroundColor });
    } catch (ignoredError) {
      return;
    }
  }

  setBadgeText(text, backgroundColor) {
    this.settings.getSettings().then(settings => {
      if (settings[SETTINGS_KEY.IS_TOOLBAR_BADGE_ENABLED]) {
        this._setBadgeText(text, backgroundColor);
        this.badgeText = text;
      } else {
        this._setBadgeText(null, backgroundColor);
        this.badgeText = text;
      }
    });
  }
}