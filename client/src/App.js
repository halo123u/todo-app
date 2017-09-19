import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route, Redirect, Switch
} from 'react-router-dom';

import TodoList from './components/TodoList';
import Login from './components/Login';
import DashBoard from './components/Dashboard';
import axios from 'axios';
class App extends Component {
  constructor(){
    super();
    this.state ={
      redirect :false,
      currentPage: '/',
      userId : null,
      auth : false,
      email : null,
      gamertag : null,
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
        email : res.data.user.email,
        gamertag :res.data.user.gamertag
      });
    }).catch(err=>{
      console.log(err);
    });
    }
  }

  componentWillUpdate = (prevState, nextState) => {
		if(nextState.redirect){
			this.setState({
				redirect: false,
				currentPage: '/'
			});
			return true;
		}else{
			return false
		}
	}

  handleSignUp = (e, email, gamertag, password)=>{
    e.preventDefault();
    console.log(gamertag);
    axios.post('/users',{
      email,
      gamertag,
      password 
    }).then(res => {
      console.log(res);
      this.setState({
        auth: res.data.auth,
        userId : res.data.user._id,
        email : res.data.user.email,
        gamertag : res.data.user.gamertag,
        redirect: true,
        currentPage: '/dashboard'  
      });
      console.log(res.headers['x-auth']);
      localStorage.setItem('token',res.headers[`x-auth`]);

    }).catch(err=>{
      console.log(err);
    });
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
        email : res.data.user.email, 
        gamertag: res.data.user.gamertag,
        redirect :true,
        currentPage: '/dashboard' 
      });
      console.log(res.headers['x-auth']);
      localStorage.setItem('token',res.headers[`x-auth`]);
    }).catch(err=>{
      console.log(err);
    });
  }
  handleLogOut = ()=>{
    console.log('this logout works')
    let token = localStorage.getItem('token');
    let header = { 'x-auth' : token };
    axios.delete('/users/me/token',{headers : header} ).then(res=>{
      console.log(res)
      this.setState({
        auth: false,
        userId : null,
        email : null, 
        gamertag: null,
        redirect: true,
        currentPage: '/'
      })
      localStorage.removeItem('token');
    }).catch(err=>{
      console.log(err);
    })
  }
  render() {
    return (
      <Router>
        <div className="App">
          {(this.state.auth) ? <input type="button" value="Logout" onClick={this.handleLogOut} /> :  null}
          {this.state.redirect ? (<Redirect to={`${this.state.currentPage}`}/>): null}
          <Switch>
            <Route exact path='/' component={()=><Login login={this.handleLoginSubmit} signup={this.handleSignUp}/>}/>
            <Route exact path='/dashboard' component={DashBoard}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
