import dotenv from 'dotenv';
dotenv.config();
import app from './Server';
import covidStats from 'src/controllers/covid-stats';

app.use('/', covidStats);
// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
