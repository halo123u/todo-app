import React, { Component } from 'react';
import axios from 'axios';

class TodoList extends Component{
constructor(){
    super();
    this.state = {
        apiData: null,
        apiDataLoaded : false
    } 
}
componentDidMount() {
    axios.get('/tasks').then((res)=>{
        console.log(res);
        this.setState({
            apiData: res.data,
            apiDataLoaded: true
        });
    }).catch(err=>{
        console.log(err);
    })
}
render() {
    return(
        <div>
            <h1>this is the TodoList</h1>
            {this.state.apiDataLoaded ? this.state.apiData.map(task=>{
                return(
                    <div key={task._id}>
                        <h3>{task.name}</h3>
                        <p>{task.content}</p>
                    </div>
                )
            }): <h1>loading.....</h1>}

        </div>
    )   
}
}

export default TodoList;