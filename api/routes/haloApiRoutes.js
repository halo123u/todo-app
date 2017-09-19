const express = require('express');
const haloApi = express.Router();

haloApi.get('/:gamertag', (req,res)=>{
    console.log(req.params.gamertag)
    res.json({works : true});
});

module.exports = haloApi;