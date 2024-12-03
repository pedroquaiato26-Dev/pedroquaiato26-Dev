"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashSHA256 = createHashSHA256;
const crypto_1 = __importDefault(require("crypto"));
function createHashSHA256(password) {
    const hash = crypto_1.default.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
