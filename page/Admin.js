import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            lapangan: [],
            id: "",
            nama: "",
            harga: "",
            gambar: null,
            action: "",
            find: "",
            message: ""
        }
        // jika tidak terdapat data token pada lokal storage
        // if(!localStorage.getItem("Token")){
            // direct ke halaman login
            // window.location = "/";
        // }
    }
    bind = (e) => {     
        this.setState({[e.target.name]: e.target.value})
    }

    bindImage = (e) => {
        this.setState({gambar: e.target.files[0]})
      }

    GetLapangan = () => {
    let url = "http://localhost/lapangan/public/lapangan"
        axios.get(url)
        .then(res => {
            this.setState({lapangan: res.data.lapangan})
        })
        .catch(error => {
            console.log(error)
        })
    }

    Add = () => {
        $("#modal_lapangan").modal("show");
        this.setState({
            action: "insert",
            id: "",
            nama: "",
            harga: "",
            image: null
        });
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_lapangan").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            nama: item.nama,
            harga: item.harga,
            gambar: item.gambar
        });
    }

    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/lapangan/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.GetLapangan();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    Search = (e) => {
        if(e.keyCode === 13) {
        //   $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/lapangan";
          let form = new FormData();
          form.append("find", this.state.find);
          axios.post(url, form)
          .then(res => {
            this.setState({lapangan: res.data.lapangan});
          })
          .catch(error => {
            console.log(error);
          });
        }
      }

    componentDidMount() {
        this.GetLapangan()
    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_lapangan").modal("hide");
        let url = "http://localhost/lapangan/public/lapangan/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("nama", this.state.nama);
        form.append("harga", this.state.harga);
        form.append("gambar", this.state.gambar, this.state.gambar.name);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.GetLapangan();
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
                    <div className="card-header bg-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Lapangan</h4>
                            </div>
                            <div className="col-sm-4">
                  <input type="text" className="form-control" name="find"
                    onChange={this.bind} value={this.state.find} onKeyUp={this.Search}
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
                                    <th>Harga</th>
                                    <th>Gambar</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.lapangan.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nama}</td>
                                            <td>{item.harga}</td>
                                            <td><img src={'http://localhost/lapangan/public/images/' + item.gambar}
                                                   alt={item.gambar} width="200px" height="200px"/></td>
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
                            <span className="fa fa-plus"></span> Tambah Data
                        </button>

                        {/* form modal siswa*/}
                        <Modal id="modal_lapangan" title="Form Lapangan" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Lapangan
                                <input type="text" className="form-control" name="nama"
                                  value={this.state.nama} onChange={this.bind} required />
                                Harga
                                <input type="text" className="form-control" name="harga" value={this.state.harga}
                                  onChange={this.bind} required />
                                Gambar
                                <tr>
                                  <input type="file" className="file-control" name="gambar"
                                    onChange={this.bindImage} required /> 
                                </tr>
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
export default Admin
