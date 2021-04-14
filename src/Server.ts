import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

const app = express();
mongoose.connect(process.env.MONGO_URI || '', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then((result) => {
        console.log('mongo connected');
    })
    .catch(e => {
        console.log('mongo connection error');
        console.log(e);
    });



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    // dev server
    console.log('dev server');
    const liveReload = require('livereload');
    const liveReloadServer = liveReload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));
    liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
    });
    
    const connectLiveReload = require('connect-livereload');
    app.use(connectLiveReload());
    // dev log
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.set('view engine', 'ejs');

// Export express instance
export default app;
