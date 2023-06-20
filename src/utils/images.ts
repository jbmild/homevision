import { promises as fs } from "fs";

export async function storeFromWeb(url: string, folderPath: string, name: string) {
    try {
        const fileExtension = url.substring(url.lastIndexOf(".") + 1);
        const fileName = name.replace(/[^a-zA-Z0-9\- ]/g, '');
        const filePath = folderPath + "/" + fileName + "." + fileExtension;

        const response = await fetch(url);
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);
        //TODO: In a prod environment, dont think that storing the images locally makes sense, maybe this should be on an S3
    } catch (error: any) {
        //TODO: this error handling could be improved. What should we do if an image no longer exists/is not available?
        console.log(error.message);
        throw error;
    }
}