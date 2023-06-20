import axios, { AxiosError } from "axios";
import { GetHouses } from "../types";

export async function getHouses(page: number = 1, perPage: number = 10) {
    const url = new URL(process.env.HOMES_API_URL);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('per_page', perPage.toString());

    return axios.get<GetHouses>(url.toString(), { headers: { Accept: 'application/json' } }).then(({ data, status }) => {
        return data;
    }).catch((reason: AxiosError) => {
        if (reason.response?.status >= 500 && reason.response?.status <= 599) {
            return getHouses(page, perPage); //TODO: this will iterate until the web responde and that could generate an infinite loop. We should add some type of counter to after X amount of times, we give up.
        }

        console.log("Unexpected error: ", JSON.stringify(reason));
        throw reason;
    }).catch((err: any) => {
        console.log("Unexpected error: ", JSON.stringify(err));
        throw err;
    });
}