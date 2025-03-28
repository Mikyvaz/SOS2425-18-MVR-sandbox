//const express = require("express");
import express from "express";
import  { loadBackend } from "./src/back/index.js";
import { handler} from './src/front/build/handler.js';
 
const app = express();
const PORT = process.env.PORT || 16078;

app.use(express.json());
// app.use("/",express.static("./public"));

loadBackend(app);

app.use(handler);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}!`);
});
