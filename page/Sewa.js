import React, {Component} from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";
import { Link } from 'react-router-dom';

class Sewa extends Component {
    constructor() {
        super();
        this.state = {
            sewa: [],
            id: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "",
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

    GetSewa = () => {
    let url = "http://localhost/lapangan/public/sewa"
        axios.get(url)
        .then(res => {
            this.setState({sewa: res.data.sewa})
        })
        .catch(error => {
            console.log(error)
        })
    }

    Add = () => {
        $("#modal_sewa").modal("show");
        this.setState({
            action: "insert",
            id: "",
            id_lapangan: "",
            id_user: "",
            tgl_book: "",
            wkt_mulai: "",
            wkt_selesai: "",
            durasi: "",
            biaya: "",
            status: "dibooking",
        });
    }

    Edit = (item) => {
        // membuka modal
        $("#modal_sewa").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            id_lapangan: item.id_lapangan,
            id_user: item.id_user,
            tgl_book: item.tgl_book,
            wkt_mulai: item.wkt_mulai,
            wkt_selesai: item.wkt_selesai,
            durasi: item.durasi,
            biaya: item.biaya,
            status: item.status,
        });
    }

    Drop = (id) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            $("#loading").toast("show");
            let url = "http://localhost/lapangan/public/sewa/drop/"+id;
            axios.delete(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("#message").toast("show");
                this.GetSewa();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    Search = (e) => {
        if(e.keyCode === 13) {
        //   $("#loading").toast("show");
          let url = "http://localhost/lapangan/public/sewa";
          let form = new FormData();
          form.append("find", this.state.find);
          axios.post(url, form)
          .then(res => {
            this.setState({sewa: res.data.sewa});
          })
          .catch(error => {
            console.log(error);
          });
        }
      }

    componentDidMount() {
        this.GetSewa()
    }

    Used = (id) => {
        if(window.confirm("Lapangan selesai digunakan")) {
            let url = "http://localhost/lapangan/public/sewa/used/" + id
            axios.post(url)
            .then (response => {
                this.GetSewa()
            })
            .catch(error => {
                console.log(error)
            })
        }
    }


    Done = (id) => {
        if(window.confirm("Lapangan selesai digunakan")) {
            let url = "http://localhost/lapangan/public/sewa/done/" + id
            axios.post(url)
            .then (response => {
                this.GetSewa()
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    Save = (event) => {
        event.preventDefault();
        $("#loading").toast("show");
        $("#modal_sewa").modal("hide");
        let url = "http://localhost/lapangan/public/sewa/save";
        let form = new FormData();
        form.append("action",this.state.action);
        form.append("id", this.state.id);
        form.append("id_lapangan", this.state.id_lapangan);
        form.append("id_user", this.state.id_user);
        form.append("tgl_book", this.state.tgl_book);
        form.append("wkt_mulai", this.state.wkt_mulai);
        form.append("wkt_selesai", this.state.wkt_selesai);
        form.append("durasi", this.state.durasi);
        form.append("biaya", this.state.biaya);
        form.append("status", this.state.status);
        axios.post(url, form)
        .then(response => {
            $("#loading").toast("hide");
            this.setState({message: response.data.message});
            $("#message").toast("show");
            this.GetSewa();
        })
        .catch(error => {
            console.log(error);
        });
    }
    render() {
        const { users } = this.state;
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-danger">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Sewa</h4>
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
                                    <th>Lapangan</th>
                                    <th>User</th>
                                    <th>Tanggal</th>
                                    <th>Mulai</th>
                                    <th>Selesai</th>
                                    <th>Status</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.sewa.map((item,index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.nama_lapangan}</td>
                                            <td>{item.username}</td>
                                            <td>{item.tgl_book}</td>
                                            <td>{item.wkt_mulai}</td>
                                            <td>{item.wkt_selesai}</td>
                                            <td>{item.status}</td>
                                            
                                            <td>
                                                {/* <button className="m-1 btn btn-sm btn-info" onClick={() => this.Edit(item)}>
                                                    <span className="fa fa-edit"></span>
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger"
                                                    onClick={() => this.Drop(item.id)}>
                                                    <span className="fa fa-trash"></span>
                                                </button> */}
                                                
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Done(item.id_sewa)}>
                                                    <span className="fa fa-check"></span>
                                                </button>
                                                {/* <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Used(item.id)}>
                                                    <span className="fa fa-trash"></span> Used
                                                </button> */}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* tombol tambah */}
                        {/* <button className="btn btn-success my-2" onClick={this.Add}>
                            <span className="fa fa-plus"></span> Tambah Data
                        </button> */}

                        {/* form modal siswa*/}
                        <Modal id="modal_sewa" title="Form Lapangan" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                ID Lapangan
                                <input type="text" className="form-control" name="id_lapangan"
                                  value={this.state.id_lapangan} onChange={this.bind} required />
                                Tanggal
                                <input type="text" className="form-control" name="tgl_book" value={this.state.tgl_book}
                                  onChange={this.bind} required />
                                Waktu Mulai
                                <input type="text" className="form-control" name="wkt_mulai" value={this.state.wkt_mulai}
                                  onChange={this.bind} required />
                                Waktu Selesai
                                <input type="text" className="form-control" name="wkt_selesai" value={this.state.wkt_selesai}
                                  onChange={this.bind} required />
                                Status
                                <input type="text" className="form-control" name="status" value={this.state.status}
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
export default Sewa
