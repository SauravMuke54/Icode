const express=require('express')
const router=express.Router()

const {getUser,getUserById,updateUser,getDetails,getUserByEm,getUserByCollege,getStudents}=require('../controller/user')
const {isSignedIn,isAuthenticated,isAdmin}=require('../controller/auth')
const {leetcodeAPI,codechefAPI,codeforcesAPI} = require( '../middleware/fetchData')
router.param("userId",getUserById)
router.param("em",getUserByEm)
router.param("clg",getUserByCollege)
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser)
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.get("/users/detail/:em",getDetails)
router.get("/users/students/:clg",getStudents)
//router.get("/users/detail",getDetails)


module.exports=router
