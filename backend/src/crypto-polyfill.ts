import { webcrypto } from "crypto";

if (!global.crypto) {
  global.crypto = webcrypto as any;
}
