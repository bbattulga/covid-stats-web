"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Server_1 = __importDefault(require("./Server"));
const covid_stats_1 = __importDefault(require("./controllers/covid-stats"));
Server_1.default.use('/', covid_stats_1.default);
// Start the server
const port = Number(process.env.PORT || 3000);
Server_1.default.listen(port, () => {
    console.log(`listening on ${port}`);
});
