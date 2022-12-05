const request = require("request-promise")
const cheerio= require("cheerio")
const fetch = require('node-fetch');
const fs = require("fs")
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

exports.codeforcesAPI =async (req,res,next)=>{

    let url ='https://competitive-coding-api.herokuapp.com/api/codeforces/'+id
    const response = await fetch(url);
    const body = await response.json();

    console.log(body)
    next()


}
exports.codechefAPI =async (req,res,next,id)=>{
    
    
    let url ='https://competitive-coding-api.herokuapp.com/api/codechef/'+id
    const response = await fetch(url);
    const body = await response.json();

    res.json(body)
    


}
exports.leetcodeAPI =async (req,res,next,id)=>{
    

    let url ='https://competitive-coding-api.herokuapp.com/api/leetcode/'+id
    const response = await fetch(url);
    const body = await response.json();

    res.json(body)
    


}




