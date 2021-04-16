"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WorldDataSchema = new mongoose_1.default.Schema({
    NewConfirmed: Number,
    TotalConfirmed: Number,
    NewDeaths: Number,
    TotalDeaths: Number,
    NewRecovered: Number,
    TotalRecovered: Number,
    Date: String
}, { timestamps: true });
const WorldData = mongoose_1.default.model('WorldData', WorldDataSchema);
exports.default = WorldData;
