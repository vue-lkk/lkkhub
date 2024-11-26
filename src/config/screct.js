const fs = require("fs");
const path = require("path");

// 1.私钥
const PRIVATEKEY = fs.readFileSync(
  path.resolve(__dirname, "./keys/private.key")
);
// 2.公钥
const PUBLICKEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"));

module.exports = {
  PRIVATEKEY,
  PUBLICKEY,
};
