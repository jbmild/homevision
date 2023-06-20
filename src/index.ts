import { config } from 'dotenv'
import { processPageOfHouses } from "./controllers/StoreHousesController";
import { createDirectoryIfNotExists } from './utils/directories';
config()

async function main() {
    await createDirectoryIfNotExists(process.env.IMAGE_FOLDER);

    const numberPages = 10;
    const housesPerPage = 10;
    //TODO make sure that folderPath exists
    let pagePromises = [];

    for (let page = 1; page <= numberPages; page++) {
        pagePromises.push(processPageOfHouses(page, housesPerPage, process.env.IMAGE_FOLDER))
    }

    return Promise.all(pagePromises).then(()=>{
        console.log("House's images downloaded successfully");
        return;
    })
} 
main()

