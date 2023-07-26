import { config } from 'dotenv'
import { processPageOfHouses } from "./controllers/StoreHousesController";
import { createDirectoryIfNotExists } from './utils/directories';
config()
import appConfig from "./common/config"

async function main() {
    await createDirectoryIfNotExists(appConfig.IMAGE_FOLDER);

    const numberPages = 10;
    const housesPerPage = 10;

    let pagePromises = [];

    for (let page = 1; page <= numberPages; page++) {
        pagePromises.push(processPageOfHouses(page, housesPerPage, appConfig.IMAGE_FOLDER))
    }

    return await Promise.all(pagePromises).then(()=>{
        console.log("House's images downloaded successfully");
        return;
    })
} 
main()

