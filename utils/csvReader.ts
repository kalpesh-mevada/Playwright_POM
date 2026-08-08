import fs from 'fs'; // this is the built-in Node.js file system module
//import path from 'path'; // this is the built-in Node.js path module
import { parse } from 'csv-parse/sync'; // this is the csv-parse library for parsing CSV files

export function readCSV(filePath: string) { // this function takes a file path as input and returns an array of objects
    //const fullPath = path.resolve(filePath); // resolve the full path of the file
    //console.log('Reading CSV file from:' + fullPath); // log the full path of the file being read
    //const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // read the file content

    const records = parse(fileContent, { // parse the file content)
        columns: true, // treat the first row as column names
        skip_empty_lines: true // skip empty lines

    })
    return records; // return the parsed records

}