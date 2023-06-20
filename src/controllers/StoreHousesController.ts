import { getHouses } from "../clients/appHomevisionClient"
import { storeFromWeb } from "../utils/images"

export async function processPageOfHouses(page: number, perPage: number, folderPath: string) {
    getHouses(page, perPage).then(({ houses }) => {
        let photoPromises = []
        for (let house of houses) {
            photoPromises.push(storeFromWeb(house.photoURL, folderPath, house.id + "-" + house.address))
        }
        Promise.all(photoPromises).then((value: any[]) => {
            return {
                error: false,
                page
            }
        }).catch((error: any) => {
            return {
                message: error.message,
                error: true,
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