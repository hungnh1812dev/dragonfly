import aes from "crypto-js/aes";
import { enc } from "crypto-js";

const _decrypt = (data: string, password: string) => {
  const bytes = aes.decrypt(data, password);
  const decryptedData = bytes.toString(enc.Utf8);
  return decryptedData;
};

const _encrypt = (data: string, password: string) => {
  const encryptedData = aes.encrypt(data, password).toString();
  return encryptedData;
};

export const crypto = {
  decrypt: _decrypt,
  encrypt: _encrypt,
};
