import React,{Component} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import $ from "jquery";
import Toast from "../component/Toast";

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            action:"insert",
            id:"",
            username:"",
            email:"",
            password:"",
            repassword:"",
            role:"Member",
            message:""
        }
    }

    bind = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    Save = (event) => {
        event.preventDefault();
        if (this.state.password === this.state.repassword)
        {
        let url = "http://localhost/lapangan/public/member/save";
        let form = new FormData();
        form.append("action", this.state.action);
        form.append("id", this.state.id);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        form.append("role", this.state.role);
        // form.append("img_user", this.state.img_user, this.state.img_user.name);
        axios.post(url, form)
  
        .then(response => {
          this.setState({message: response.data.message});
          this.GetMember()
        })
        .catch(error => {
          console.log(error);
        });
        window.location = "/";
      }
      else{
        window.location = "/register"
      }
    }

    render() {
        return (
          <div className="container" style={{width: 24 + "rem", paddingTop : 6 + '%'}}>
        <div className="card-body">
          <div className="# ">
            <h2 className="#" style={{textAlign: "center"}}>Register</h2>
          </div>
          <div className="card-body">
            <form onSubmit={this.Save}>
               Username
               <input type="text" className="form-control" name="username"
                 value={this.state.username} onChange={this.bind} required />
               Email
               <input type="text" className="form-control" name="email"
                 value={this.state.email} onChange={this.bind} required />
               Password
               <input type="password" className="form-control" name="password"
                 value={this.state.password} onChange={this.bind} required />
               Confirm Password
               <input type="password" className="form-control" name="repassword"
                 value={this.state.repassword} onChange={this.bind} required />
            
              <button type="submit" className="btn btn-info pull-right m-2" >
                 <span className="fa fa-check"></span> Simpan
               </button>
              </form>
              <br/>
              <Link to="/">
                  Log In
              </Link>
              <Toast id="message" autohide="true" title="Informasi">
                {this.state.message}
              </Toast>
            </div>
          </div>
        </div>
        );
    }
}
export default Register