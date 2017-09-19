import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password:'',
        }
    }
    handleInputChange =  (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState ({
          [name]: value
        });
      } 
    render(){
        return(
        <form onSubmit={(e)=>this.props.login(e,this.state.email, this.state.password)}>
            <input type="email" placeholder="Email" name="email" onChange={this.handleInputChange} value={this.state.email} /> <br></br>
            <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password"/>
            <button>login</button>
          </form>

        );
    }
}
export default Login;