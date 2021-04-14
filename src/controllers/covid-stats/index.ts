import express from 'express';
import axios from 'axios';
import cron from 'node-cron';

import WorldData from './models/WorldData';

const app = express.Router();

const fetchWorldData = async (): Promise<IDataRecord> => {
    const response = await axios.get('https://api.covid19api.com/summary');
    const dataRaw: IDataRecord[] = response.data.Global;
    const data = new WorldData(dataRaw);
    return data;
}

cron.schedule('*/10 * * * *', async () => {
    console.log('cron fetch');
    const worldData = await fetchWorldData();
    const [lastData] = await WorldData.find({}).sort({_id: -1}).limit(1);
    if (worldData.Date !== lastData.Date){
        console.log('new record');
        const result = await WorldData.create(worldData);
        console.log('new record result');
        console.log(result);
    } else{
        console.log('world data same');
    }
});

app.get('/:country?', async function(req, res){
    const country = req.params.country?.toLowerCase();
    res.render('index', {message: `${country}`});
});

app.get('/save', async function(req, res){
    res.render('index', {message: 'qqq'});
});

export default app;