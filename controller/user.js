const User = require('../models/user')
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
//const {leetcodeAPI,codechefAPI,codeforcesAPI} = require( '../middleware/fetchData')


const codeforcesAPI= async (id)=>{
    
    let url ='https://codeforces.com/api/user.info?handles='+id
    try{
     const response = await fetch(url);
    const body = await response.json();
  console.log("CodeForces:",body)
    return body
    }catch(e){
    console.log(e)
    }
   

}
const codechefAPI =async (id)=>{
    console.log(id)
    
    let url ='http://127.0.0.1:5003/api/codechef/'+id
    try{
    
     const response = await fetch(url);
    console.log(response)
    const body = await response.json();
    console.log("Codechef",body)
     return body
    
    }catch( e){
    console.log(e)
    }
    
   
   
    


}
const leetcodeAPI =async (id)=>{
    

    let url ='http://127.0.0.1:5003/api/leetcode/'+id
    try{
    const response = await fetch(url);
    const body = await response.json();
    console.log("Leetcode:",body)
    return body
    
    
    }catch(e){
    console.log(e)
    }
    


}







exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB BY ID"
            })
        }
       
       
        req.profile=user;
        next();
    })
}


exports.getUserByEm=(req,res,next,id)=>{
   id=id.replace(":","")
    User.find({username:id}).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        }
       
    
        req.profile=user;
        next();
    })
}
exports.getUserByCollege=(req,res,next,id)=>{
   id=id.replace(":","")
    User.find({collegename:id}).exec((err,user)=>{

        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB"
            })
        }
       
    
        req.profile=user;
        next();
    })
}

exports.getUser= async (req,res)=>{

    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    req.profile.createdAt=undefined;
    req.profile.updatedAt=undefined;
    return res.json(req.profile);
}
exports.getStudents= async (req,res)=>{

  
    return res.json(req.profile);
}
exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true},
        {useFindAndModify:false},(err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"You are not authorized to update this."
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)

        }
        )
}

exports.getDetails=async(req,res)=>{
  
 
   
    // User.find({username:id}).exec(async (err,user)=>{

    //     if(err || !user){
    //         return res.status(400).json({
    //             error:"No user was found in DB"
    //         })
    //     }
    
        if(req.profile.length!==0){
            let codeforcesId=req.profile[0].codeforces
            let leetcodeId=req.profile[0].leetcode
            let codechefId=req.profile[0].codechef
            let name=req.profile[0].name
            let lastname=req.profile[0].lastname
            let college=req.profile[0].collegename
            console.log(name,lastname,college)
            let res1= await codechefAPI(codechefId)
             let res3=await leetcodeAPI(leetcodeId)
            let res2=await codeforcesAPI(codeforcesId)
            
            
           
           
           
           return res.json({codechef:res1,codeforces:res2,leetcode:res3,name:name,lastname,lastname:lastname,college:college})
      }else{
      return res.json({error:"No User Found"})
      }
     res.end()
    // })
   
   
//    let codeforcesId=req.profile[0].codeforces
//    let leetcodeId=req.profile[0].leetcode
//     let codechefId=req.profile[0].codechef
   
//     let res1= await codechefAPI(codechefId)
   
//     let res2=await codeforcesAPI(codeforcesId)

//     let res3=await leetcodeAPI(leetcodeId)
   
   
   
//    return res.json({codechef:res1,codeforcesAPI:res2,leetcodeAPI:res3})
}
