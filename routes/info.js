const express=require('express');
const router=express.Router()
const {codechefAPI,codeforcesAPI,leetcodeAPI} =require('../controller/info')
router.get('/codechef/:id',codechefAPI);

router.get('/codeforces/:id', codeforcesAPI);

router.get('/leetcode/:id',leetcodeAPI);

router.get('/all/',leetcodeAPI);

module.exports = router;

