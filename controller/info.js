const request = require("request-promise")
const cheerio= require("cheerio")
const fetch = require('node-fetch');
const fs = require("fs")
const axios = require('axios');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;
let CodeChef
let Codeforces
let Leetcode

exports.codechefAPI =async (req,res)=>{
    
    const {id}=req.params
    const url="https://www.codechef.com/users/"+id
    const response= await request({
        uri:url,
        headers:{
            "accept": "application/x-clarity-gzip",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
    },
        gzip:true,
        
    })

    let $ = cheerio.load(response)
    let num=$('div[class="rating-number"]').text()
    let star=$('div[class="rating-star"]').text()
    let grank=$('a[href="/ratings/all"]').text()
    let crank=$('a[href="/ratings/all?filterBy=Country%3DIndia"]').text()
    
    let lastcontest=$('div[class="contest-name"]>a').text()
    let solved=$('div[class="content"]>h5').text().split(")")
    let username=$('span[class="m-username--link"]').text()
    let div="";
    if(num>0 && num<1400){
        div="Div 4"
    }else if(num>=1400 && num<1600){
        div="Div 3"
    }else if(num>=1600 && num<1800){
        div="Div 2"
    }else if("num>=1800 "){
        div="Div 1"
    }else{
        div="Invalid "
    }


    const profile={
        name:username,
        rating:num,
        divison:div,
        stars:star,
        global_rank:grank,
        country_rank:crank,
        recent_contest:lastcontest,
        total_problems: solved
    }
    CodeChef=profile    
    console.log(profile)
    
    res.json(profile)


}



 // codeforces controller
 exports.codeforcesAPI =async (req,res)=>{
    
    const {id}=req.params
    const url="https://codeforces.com/profile/"+id
    const response= await request({
        uri:url,
        headers:{
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9"
    },
        gzip:true,
        
    })

    let $ = cheerio.load(response)
    
let num=$('span[class="user-gray"]').text()

let div=$('span[class="user-gray"]').text().split(" ")


let user=$('a[href="/profile/sauravmuke54"]').text()
let imae=$('img').text()


let total_solved=$('div[class="_UserActivityFrame_counterValue"]').text().split('  ')

//let total_solved=$('div[class="UserActivityFrame_counterValue"]').text()


    const profile={
        name:user,
        rating:num,
        divison:div, 
        total_problems: total_solved,
        
    }
    Codeforces=profile
    console.log(profile)
    
    res.json(profile)

 }



// leetcode controller
//  exports.leetcodeAPI =async (req,res)=>{
    
//     const {id}=req.params
//     const url="https://leetcode.com/"+id+"/"
//     const response= await request({
//         uri:url,
//         headers:{"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       "accept-language": "en-US,en;q=0.9",
      
//     },gzip:true,
    

        
//     })
    

//     console.log(response)
    
//     let $ = cheerio.load(response)
    
//     let contest_rating=$('div[class="text-label-1 dark:text-dark-label-1 flex items-center text-2xl"]').text()

// let total_solved=$('div[class="text-[24px] font-medium text-label-1 dark:text-dark-label-1"]>div>div').text()


// let easy=$('span[class="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1"]').text()


// let medium=$('span[class="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1"]').text()


// let hard =$('span[class="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1"]').text()

// let badge=$('div>div[class="text-label-1 dark:text-dark-label-1 mt-1.5 text-2xl leading-[18px]"]').text()

// let total_submission=$('span[class="mr-[5px] text-base font-medium lc-md:text-xl"]').text()

// let rating=$('span[class="font-medium text-label-2 dark:text-dark-label-2"]').text()




// //let div=$('div[class="text-label-2 dark:text-dark-label-2 flex flex-col space-y-4"]').text()

// res.json({contest_rating,total_solved,easy,medium,hard,badge,total_submission,rating})
// }





exports.leetcodeAPI = async (req,res)=>{
     
    const response = await fetch('https://competitive-coding-api.herokuapp.com/api/leetcode/user7383q');
const body = await response.json();

    res.json(body)

};


// exports.leetcodeAPI=async(req,res)=>{
//     const html = await axios.get('https://leetcode.com/user7383q');
//     const dom = new JSDOM(html.data);
//     //let $ = cheerio.load(html.data)
//    // const easy = dom.window.document.getElementsByClassName('mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1')[0];
//    //let contest_rating=$('span[class="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1"]')[0].children
//     const easy=dom.window.document.querySelector("#__next > div > div > div > div.w-full.lc-lg\\:max-w-\\[calc\\(100\\%_-_316px\\)\\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\\:flex-row.lc-xl\\:space-y-0.lc-xl\\:space-x-4 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\\:mx-8 > div.flex.w-full.flex-col.space-y-4.lc-xl\\:max-w-\\[228px\\] > div:nth-child(1) > div.flex.w-full.items-end.text-xs > div.flex.flex-1.items-center > span.mr-\\[5px\\].text-base.font-medium.leading-\\[20px\\].text-label-1.dark\\:text-dark-label-1")
//     console.log("Easy Solved:",easy)
// }