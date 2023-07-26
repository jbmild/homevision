import axios from "axios";
import { promises as fs } from "fs";

export async function storeFromWeb(url: string, folderPath: string, name: string) {
    try {
        const fileExtension = url.substring(url.lastIndexOf(".") + 1); //TODO: check the image type from the metadata (could have the extension hidden)
        const fileName = name.replace(/[^a-zA-Z0-9\- ]/g, '');
        const filePath = folderPath + "/" + fileName + "." + fileExtension;
        
        const response = await axios.get(url); //TODO: improve that if this get fails, it only retries this file.
        const buffer = Buffer.from(response.data);
        await fs.writeFile(filePath, buffer);
        //TODO: In a prod environment, dont think that storing the images locally makes sense, maybe this should be on an S3
    } catch (error: any) {
        //TODO: this error handling could be improved. What should we do if an image no longer exists/is not available/server side error?
        console.log(error.message);
        throw error;
    }
}