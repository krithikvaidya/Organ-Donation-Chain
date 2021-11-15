import React, {Component} from 'react';
import axios from 'axios';
import {Navigation} from './NavLogin';

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "username": ""
            }
        }

        login(newUser, type) {
            console.log("New user is: ")
            console.log(newUser)
            axios.request({
                method:'post',
                url:'http://localhost:3000/api/Users/login',
                data: newUser
              }).then(response => {
              localStorage.ptspotter_accessToken = response.data.id;
            //   localStorage.ptspotter_userId = response.data.userId;

              console.log("Response is: ")
              console.log(response)


              if(type === "H"){
                localStorage.ptspotter_hospitalId = newUser.username;
                this.props.history.push('/patients');
              }
              else if(type === "D"){
                localStorage.ptspotter_donorId = newUser.username;
                this.props.history.push('/donorhome');
              }
             else if(type === "R"){
                localStorage.ptspotter_recipientId = newUser.username;
                this.props.history.push('./recipienthome');
             }
              }).catch(err => console.log(err));
        }

    onSubmitH(e){

        const newUser = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        this.login(newUser, "H");
        e.preventDefault();
    }

    onSubmit(e){

        const newUser = {
            username: this.refs.username.value,
            password: this.refs.password.value,
        }
        this.login(newUser, this.refs.type.value);
        e.preventDefault();
    }

    render() {

        if (localStorage.getItem("ptspotter_hospitalId") === null) {

            return (
                <div>
                    <div className = "Nav">
                    <Navigation/>
                   </div>
    
                 <div className="inlogin">
                    
                    <h3>Hospital Login</h3>
                    <form onSubmit={this.onSubmitH.bind(this)} action="#">
                        <div className="input-field">
                        <input type="text" name="username" ref="username" />
                            <label htmlFor="username">UserName</label>
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" ref="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <br /><input type="submit" value="Login" className="btn" />
                    </form>
                </div>
                </div>
            
            )

        } else {
            return (
                <div>
                    <div className = "Nav">
                    <Navigation/>
                   </div>
    
                 <div className="inlogin">
                    
                 <h3>Donor/Recipient Login</h3>
                    <form onSubmit={this.onSubmit.bind(this)} action="#">
                        <div className="input-field">
                            <input type="text" name="type" ref="type" />
                            <label htmlFor="type">Account Type (D/R)</label>
                        </div>
                        <div className="input-field">
                        <input type="text" name="username" ref="username" />
                            <label htmlFor="username">UserName</label>
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" ref="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <br /><input type="submit" value="Login" className="btn" />
                    </form>
                </div>
                </div>
            
            )
        }

        
    }
}

export default Login;