import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class AdminData extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            id: "",
            username: "",
            email: "",
            password: "",
            role: "",
            find: "",
        }
    }
    bind = (e) => {     
        this.setState({[e.target.name]: e.target.value})
    }

    GetUsers = () => {
    let url = "http://localhost/lapangan/public/member"
        axios.get(url)
        .then(res => {
            this.setState({users: res.data.users})
        })
        .catch(error => {
            console.log(error)
        })
    }

    Add = () => {
        $("#modal_users").modal("show");
        this.setState({
            action: "insert",
            id: "",
            username: "",
            email: "",
            password: "",
            role: "Member",
        });
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_users").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            username: item.username,
            email: item.email,
            password: item.password,
            role: item.role,
        });
    }

    Search = (e) => {
        if (e.keyCode === 13) {
        let url = "http://localhost/lapangan/public/member"
        let form = new FormData()
        form.append("find", this.state.find)
        axios.post(url, form)
            .then(res => {
                this.setState({users: res.data.users})
            })
            .catch(error => {
                console.log(error);
            })
        }
    }

    componentDidMount() {
        this.GetUsers();
    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_users").modal("hide");
        let url = "http://localhost/lapangan/public/member/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id_user", this.state.id_user);
        form.append("username", this.state.username);
        form.append("email", this.state.email);
        form.append("password",this.state.password);
        form.append("role", this.state.role);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.GetUsers();
        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data User</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                    onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                    placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin faspinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.users.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role}</td>
                                            
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data User
                        </button>

                        {/* form modal siswa*/}
                        <Modal id="modal_users" title="Form Data User" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Username
                                <input type="text" className="form-control" name="username"
                                  value={this.state.username} onChange={this.bind} required />
                                Email
                                <input type="text" className="form-control" name="email" value={this.state.email}
                                  onChange={this.bind} required />
                                Password
                                <input type="text" className="form-control" name="password" value={this.state.password}
                                  onChange={this.bind} required />
                                Role
                                <input type="text" className="form-control" name="role" value={this.state.role}
                                  onChange={this.bind} required />
                                <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Simpan
                                </button>
                            </form>
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
export default AdminData
