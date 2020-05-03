import { createCipheriv, createDecipheriv } from 'crypto';
import config from 'src/config';

export const encrypt = (text: string) => {
  const iv = Buffer.from(config.ENCRYPTION_IV, 'hex');
  const cipher = createCipheriv('aes-256-cbc', config.ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decrypt = (text: string) => {
  const [iv_string, text_string] = text.split(':');
  const iv = Buffer.from(iv_string, 'hex');
  const encrypted_text = Buffer.from(text_string, 'hex');
  const decipher = createDecipheriv('aes-256-cbc', config.ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted_text);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
