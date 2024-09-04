'use server';
import { promises as fs } from 'fs';


export const fileHandler = async (path)=>{
    // const file = await fs.readFile(path);
    const file = await fs.readFileA(process.cwd() + path, 'utf8');

    // console.log(file)

    

    // const file = await fs.readFile(values.uploadFile);

}