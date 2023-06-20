import { APIHouseListed } from "./types";
import axios, { AxiosError } from 'axios';
import { promises as fs } from "fs";

const apiUrl = "http://app-homevision-staging.herokuapp.com/api_project/houses";
const successStatus = 200;

type GetHouses = {
    houses: APIHouseListed[]
}

export async function getHouses(page: number = 1, perPage: number = 10) {
    return axios.get<GetHouses>(apiUrl, { headers: { Accept: 'application/json' } }).then(({ data, status }) => {
        return data;
    }).catch((reason: AxiosError) => {
        if (reason.response?.status >= 500 && reason.response?.status <= 599) {
            console.log("Retry");
            return getHouses(page, perPage);
        }

        console.log("Unexpected error: ", JSON.stringify(reason));
        throw reason;
    }).catch((err: any) => {
        console.log("Unexpected error: ", JSON.stringify(err));
        throw err;
    });
}

export async function storeFromWeb(url: string, name: string) {
    const fileExtension = url.substring(url.lastIndexOf(".") + 1)
    const fileName = name.replace(/[^a-zA-Z0-9\- ]/g, '')
    const folder = "./images"
    const filePath = folder + "/" + fileName + "." + fileExtension
    console.log(filePath)

    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);
}


async function processPageOfHouses(page: number, perPage: number) {
    getHouses(page, perPage).then(({ houses }) => {
        console.log(houses)
        let photoPromises = []
        for (let house of houses) {
            console.log(house)
            photoPromises.push(storeFromWeb(house.photoURL, house.id + "-" + house.address))
        }
        Promise.all(photoPromises).then((value: any[]) => {
            return {
                error: false,
                page
            }
        })
    }).catch((error: any) => {
        return {
            message: error.message,
            error: true,
            page
        }
    })
}


processPageOfHouses(1, 10)