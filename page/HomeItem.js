import React from 'react';
import $ from "jquery";
import Modal from "../component/Modal";
import axios from 'axios';

export default class HomeItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    GetSewa = () => {
        let url = "http://localhost/lapangan/public/myorder"
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
                status: "booked",
            });
        }
        componentDidMount() {
            this.GetSewa()
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
      render(){
        const { item } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100" style={{ marginBottom: "10px"}}>
                <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + item.gambar} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{item.nama}</a>
                        </h4>
                        <h5>Rp. {item.harga}/Jam</h5>
                        {/* <p className="card-text">Silakan hubungi no : 08888888888</p> */}
                        <hr/>
                        <div>
                        <button className="btn btn-sm btn-warning" 
                            onClick={this.Add}>Booking</button>
                        </div>
                        <Modal id="modal_sewa" title="Form Booking" bg_header="success"
                        text_header="white">
                            <form onSubmit={this.Save}>
                                Tanggal
                                <input type="date" className="form-control" name="tgl_book" value={this.state.tgl_book}
                                  onChange={this.bind} required />
                                Waktu Mulai
                                <input type="time" className="form-control" name="wkt_mulai" value={this.state.wkt_mulai}
                                  onChange={this.bind} required />
                                Waktu Selesai
                                <input type="time" className="form-control" name="wkt_selesai" value={this.state.wkt_selesai}
                                  onChange={this.bind} required />
                                
                                <button type="submit" className="btn btn-info pull-right m-2">
                                  <span className="fa fa-check"></span> Booking
                                </button>
                            </form>
                        </Modal>
                </div>
            </div>
            </div>
       );
    }

}
