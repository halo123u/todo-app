const express = require('express');
const axios = require('axios');
const authenticate = require('../../services/auth/authenticate');
const haloApi = express.Router();

haloApi.get('/',authenticate, (req,res)=>{
    console.log(req.user);
    let UserInfo = {
        basicInfo :null,
        emblem : '',
        spartan: ''
    };
    let header = { 'Ocp-Apim-Subscription-Key' : process.env.HALO_KEY };
    axios.get(`https://www.haloapi.com/profile/h5/profiles/${req.user.gamertag}/appearance`,{ headers : header }).then( data => {
        console.log(data.data);
        UserInfo.basicInfo = data.data;
        axios.get(`https://www.haloapi.com/profile/h5/profiles/${req.user.gamertag}/emblem`,{ headers : header }).then( data =>{
            console.log(data.request.path);
            UserInfo.emblem = `https://image.halocdn.com/${data.request.path}`;
            axios.get(`https://www.haloapi.com/profile/h5/profiles/${req.user.gamertag}/spartan?size=512&crop=full`,{ headers : header }).then(data =>{
                console.log(data.request.path);
                UserInfo.spartan = `https://image.halocdn.com/${data.request.path}`;
                res.send(UserInfo);
            })
        }).catch(err => {console.log(err)});
    }).catch(err=>{
      console.log(err);
    });

    // console.log(UserInfo)
   
});

module.exports = haloApi;