import { decodeSettings, encodeSettings } from "./settings";
import { getCookie, setCookie } from "@prettylab/core/utils/cookie/ssrCookie";

export const getServerSettings = async (key?: string) => {
  const encoded = await getCookie("settings");
  const settings = encoded ? decodeSettings(encoded) : {};
  return (key ? settings[key] : settings) ?? {};
};

export const saveServerSettings = async (key: string, value: any) => {
  const encoded = await getCookie("settings");
  const settings = encoded ? decodeSettings(encoded) : {};
  settings[key] = value;

  const newEncoded = encodeSettings(settings);
  await setCookie("settings", newEncoded);
};
