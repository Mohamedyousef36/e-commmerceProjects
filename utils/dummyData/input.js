import fs, { readFileSync } from 'fs'
// import colors from 'color' // install  it
import dotenv from 'dotenv'
import Product from '../../models/Product.js'
import dbConnect from '../../config/db.js'
import asyncHandler from "express-async-handler";
import path from 'path';

dotenv.config({path:'../../.env'})
//connect to DB
dbConnect();
//reade files
const products = JSON.parse(fs.readFileSync('./data.json'));

//insert data

const insertData = asyncHandler(async () => {
    await Product.create(products);
    console.log('Data Get Inserted');
    process.exit()
});


//deleted data

const deletedData = asyncHandler(async () => {
    await Product.deleteMany();
    console.log('Data Get deleteded');
    process.exit()
})

if (process.argv[2] == 'i') {
    insertData();
}
else if (process.argv[2] == 'd') {
    deletedData();
}
    
