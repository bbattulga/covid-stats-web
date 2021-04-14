import mongoose, {Document} from 'mongoose';

const WorldDataSchema = new mongoose.Schema({
    NewConfirmed: Number,
    TotalConfirmed: Number,
    NewDeaths: Number,
    TotalDeaths: Number,
    NewRecovered: Number,
    TotalRecovered: Number,
    Date: String
}, {timestamps: true});

const WorldData = mongoose.model<IDataRecord>('WorldData', WorldDataSchema);

export default WorldData;