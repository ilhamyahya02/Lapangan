import React from 'react';
import axios from 'axios';
import $ from "jquery";
import { Link } from 'react-router-dom';
import Slide1 from '../image/bg.jpg';
import Slide2 from '../image/bg.jpg';
import HomeItem from './HomeItem';
import Modal from "../component/Modal";


export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lapangan: [],
            id: "",
            nama: "",
            harga: "",
            gambar: null,
            find : ""
        }
        // if(!localStorage.getItem("Token")){
        //     window.location = "/login";
        //   }
    }
    
    bind = (e) => {     
        this.setState({[e.target.name]: e.target.value})
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]})
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

    Edit = (item) => {
        // membuka modal
        $("#modal_lapangan").modal("show");
        // mengisikan data pada form
        this.setState({
            action: "update",
            id: item.id,
            nama: item.name,
            harga: item.harga,
            gambar: item.gambar
        });
    }

    Search = (e) => {
        if (e.keyCode === 13) {
        let url = "http://localhost/lapangan/public/lapangan"
        let form = new FormData()
        form.append("find", this.state.find)
        axios.post(url, form)
            .then(res => {
                this.setState({lapangan: res.data.lapangan})
            })
            .catch(error => {
                console.log(error);
            })
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
        const renderData = this.state.lapangan.map((item, id)=>{
            return (
            <HomeItem item={item} key={id}/>
            )
            })
            return (
                
                <div className="">
                                    <div id="slideshow" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner" role="listbox">
                                            <div className="carousel-item active">
                                                <img className="d-block img-fluid" src={Slide1} alt="" />
                                            </div>
                                            
                                        </div>
                                    </div>
                                <div className="container">
                                    <br/>
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.Search}
                                placeholder="Pencarian..." />
                                    <div className="row mt-4">
                                        {renderData}
                                        
                                    </div>
                                    </div>
                                
                            </div>
                
                
                );
    }
}