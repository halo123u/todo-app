import React, { Component } from 'react';
import TodoList from './components/TodoList';
import Login from './components/Login';
import axios from 'axios';
class App extends Component {
  constructor(){
    super();
    this.state ={
      redirect :false,
      userId : null,
      auth : false,
      email : null
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    if(token){
    let header = { 'x-auth' : token };
    axios.get('/users/me',{ headers : header }).then( res=>{
      console.log(res);
      this.setState({
        auth: res.data.auth,
        userId : res.data.user._id,
        email : res.data.user.email 
      });
    }).catch(err=>{
      console.log(err);
    });
    }
  }
  

  handleLoginSubmit = (e,email, password)=>{
    e.preventDefault();
    axios.post('/users/login',{
      email,
      password 
    }).then(res => {
      console.log(res);
      this.setState({
        auth: res.data.auth,
        userId : res.data.user._id,
        email : res.data.user.email 
      });
      console.log(res.headers['x-auth']);
      localStorage.setItem('token',res.headers[`x-auth`]);
    }).catch(err=>{
      console.log(err);
    });
  }
  render() {
    return (
      <div className="App">
        {/* <TodoList /> */}
        <Login login={this.handleLoginSubmit}/>
      </div>
    );
  }
}

export default App;
