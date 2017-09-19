import React, { Component } from 'react';
import axios from 'axios';  

class DashBoard extends Component{
    constructor(){
        super();
        this.state= {
            apiData :null,
            apiDataLoaded  :false
        }
    }

    componentDidMount() {
        axios.get(`/haloApi/${this.props.gamertag}`).then(res=>{
            console.log(res);
        })
    }
    render(){
        return(
            <h1>hello this is the DashBoard</h1>
        )
    }
}

export default DashBoard;