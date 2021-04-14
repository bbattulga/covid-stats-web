import {Document} from 'mongoose';

declare global {
    export interface IDataRecord extends Document{
        NewConfirmed: number,
        TotalConfirmed: number,
        NewDeaths: number,
        TotalDeaths: number,
        NewRecovered: number,
        TotalRecovered: number,
        Date: string
    }
}