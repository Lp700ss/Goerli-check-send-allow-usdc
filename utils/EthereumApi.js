import { useState, useEffect } from "react";

import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and metamask is running
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // we are on the server *OR* the user is not running metamask
  // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/14a92a90d93b4c9b96f06e39382dad69"
  );
  web3 = new Web3(provider);
}


const Decimal = require("decimal.js");
const applyDecimals = (rawValue, decimals, sign = "negative") => {
  if (!rawValue) return "";

  return Decimal(rawValue)
    .mul(Decimal(10).pow(Decimal(sign === "positive" ? decimals : -decimals)))
    .toFixed();
};

module.exports = {
  applyDecimals,
  web3,
};
