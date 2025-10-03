import {
  decodeSettings,
  encodeSettings,
} from "@prettylab/core/utils/settings/settings";
import {
  getCookie,
  setCookie,
} from "@prettylab/core/utils/cookie/clientCookie";

export function getClientSettings(key?: string) {
  try {
    const encoded = getCookie("settings");
    const settings = encoded ? decodeSettings(encoded) : {};
    return (key ? settings[key] : settings) ?? null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function saveClientSettings(key: string, value: any): void {
  try {
    const encoded = getCookie("settings");
    const settings = encoded ? decodeSettings(encoded) : {};
    settings[key] = value;
    setCookie("settings", encodeSettings(settings));
  } catch (err) {
    console.error(err);
  }
}
