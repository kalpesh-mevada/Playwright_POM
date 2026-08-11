import * as XLSX from 'xlsx';
import path from 'path'; //To resolve absolute path of the file to relative path

export type LoginData = {
    username: string;
    password: string;   
    expected: string;
    run: string;
}


export function readExcel(filePath: string, sheetName: string): LoginData[]{ // this function takes a file path as input and returns an array of objects
    const fullPath = path.resolve(filePath); // resolve the full path of the file
    console.log('Full path is ', + fullPath); // log the full path of the file being read
    const workbook = XLSX.readFile(fullPath); // read the excel
    const sheet = workbook.Sheets[sheetName]; // get the sheet by name
    const data = XLSX.utils.sheet_to_json(sheet); // convert the sheet to json
    return data as LoginData[];
}