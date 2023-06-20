import { promises as fs } from "fs";

export async function createDirectoryIfNotExists(path:string) {
    return fs.access(path).catch((error: any) => {
        fs.mkdir(path).catch((error:any)=>{
            console.log("Error creating the image folder:", error.message);
            throw error;
        })
    });
}