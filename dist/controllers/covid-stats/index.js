"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const node_cron_1 = __importDefault(require("node-cron"));
const WorldData_1 = __importDefault(require("./models/WorldData"));
const app = express_1.default.Router();
const fetchWorldData = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://api.covid19api.com/summary');
    const dataRaw = response.data.Global;
    const data = new WorldData_1.default(dataRaw);
    return data;
});
node_cron_1.default.schedule('*/10 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('cron fetch');
    const worldData = yield fetchWorldData();
    const [lastData] = yield WorldData_1.default.find({}).sort({ _id: -1 }).limit(1);
    if (worldData.Date !== lastData.Date) {
        console.log('new record');
        const result = yield WorldData_1.default.create(worldData);
        console.log('new record result');
        console.log(result);
    }
    else {
        console.log('world data same');
    }
}));
app.get('/:country?', function (req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const country = (_a = req.params.country) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        res.render('index', { message: `${country}` });
    });
});
app.get('/save', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('index', { message: 'qqq' });
    });
});
exports.default = app;
