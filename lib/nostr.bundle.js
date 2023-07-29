"use strict";
var NostrTools = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // index.ts
  var nostr_access_control_exports = {};
  __export(nostr_access_control_exports, {
    generatePrivateKey: () => generatePrivateKey,
    getPublicKey: () => getPublicKey
  });

  // keys.ts
  function generatePrivateKey() {
    return "private";
  }
  function getPublicKey(privateKey) {
    return "public";
  }
  return __toCommonJS(nostr_access_control_exports);
})();
