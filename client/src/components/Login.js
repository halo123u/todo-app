import React, { Component } from 'react';

class Login extends Component{
    constructor(props){
        super(props);
        this.state ={
            email: '',
            emails: '',
            password: '',
            passwords: '',
            gamertag: ''
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
        <div>
            <h1>Log In</h1>
            <form onSubmit={(e)=>this.props.login(e,this.state.email, this.state.password)}>
                <input type="email" placeholder="Email" name="email" onChange={this.handleInputChange} value={this.state.email} /> <br/>
                <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password"/>
                <button>login</button>
            </form> <br/>
            <h1>Sign Up</h1>
            <form onSubmit={(e)=>this.props.signup(e, this.state.emails, this.state.gamertag, this.state.passwords)}>
                <input type="email" placeholder="Email" name="emails" onChange={this.handleInputChange} value={this.state.emails} /> <br/>
                <input type="text" name="gamertag" placeholder="Gamertag" value={this.state.gamertag} onChange={this.handleInputChange}/><br/>
                <input type="password" name="passwords" onChange={this.handleInputChange} value={this.state.passwords} placeholder="Password"/>
                <button>SignUp</button>
            </form>

        </div>

        );
    }
}
export default Login;