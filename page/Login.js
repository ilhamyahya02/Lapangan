import React, { Component } from "react";
import axios from "axios";
import Toast from "../component/Toast";
import $ from "jquery";
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      role: "",
      message: ""
    };
  }

  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  Login = (event) => {
    event.preventDefault();
    let url = "http://localhost/lapangan/public/login";
    let form = new FormData();
    form.append("username", this.state.username);
    form.append("password", this.state.password);
    axios.post(url, form)
      .then(response => {
        let logged = response.data.status;
        let role = response.data.role;
        if (logged) {
           if(role === "Admin") {
             window.location = "/admin"
           } else {
             window.location = "/home"
           }
          this.setState({ message: "Logged in!" });
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("role", JSON.stringify(response.data.role));
          localStorage.setItem("id", JSON.stringify(response.data.users.id));

        } else {
          this.setState({ message: "Login failed" });
        }
        $("#message").toast("show");
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className="container" style={{ width: "50%", height:"50%" }}>
        <div className="card my-2">
          <div className="card-header bg-dark">
            <h5 className="text-light text-center">Login User</h5>
          </div>

          <div className="card-body">
            <Toast id="message" autohide="false" title="Informasi">
              {this.state.message}
            </Toast>
            <form onSubmit={this.Login}>
              <input type="text" className="form-control m-1" name="username" value={this.state.username} onChange={this.bind} required
              placeholder="Masukkan username"/>
              <input type="password" className="form-control m-1" name="password" value={this.state.password} onChange={this.bind}
              required placeholder="Masukkan password"/>
              <button className="mt-2 btn btn-block btn-primary" type="submit">
                <span className="fa fa-sign-in"></span> Login
              </button>
              <Link to="/register">
              <button className="mt-2 btn btn-block btn-success" type="button">
                <span className="fa fa-sign-in"></span> Register
              </button>
              </Link>
             
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
