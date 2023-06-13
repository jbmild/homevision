import axios from 'axios';
import { APIHouseListed } from '../types'

const apiUrl = "http://app-homevision-staging.herokuapp.com/api_project/houses";
const successStatus = 200;

type GetHouses = {
    houses: APIHouseListed[]
}

export async function getHouses(page: number = 1, perPage: number = 10) {
    try {
        const { data, status } = await axios.get<GetHouses>(apiUrl, { headers: { Accept: 'application/json' } });

        if (status != successStatus) {
            throw new Error("An error occurred while retrieving page " + page)
        }

        return data;
    } catch (err) {
        console.log('Error message: ', err.message);
        throw err
    }
}