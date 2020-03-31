import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Toast from "../component/Toast";
import Modal from "../component/Modal";

class Order extends Component {
    constructor() {
        super();
        this.state = {
            order: [],
            id_orders: "",
            id: "",
            id_alamat: "",
            id_user: "",
            total: "",
            bukti_bayar: null,
            status: "",
            detail: "",
            action: "",
            message: ""
        }
        //jika tidak terdapat data token pada lokal storage
        if (!localStorage.getItem("Token")) {
            // direct ke halaman login
            window.location = "/login";
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    bindImage = (e) => {
        this.setState({ image: e.target.files[0] })
    }
    // fungsi untuk membuka form tambah data

    get_order = () => {
        // $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/orders";
        axios.get(url)
            .then(response => {
                this.setState({ order: response.data.order });
                $("#loading").toast("hide");
            })
            .catch(error => {
                console.log(error);
            });
    }

    Accept = (id) => {
        if (window.confirm("Apakah anda yakin ingin menerima orderan ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/accept/" + id;
            axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("message").toast("show");
                this.get_order();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    Decline = (id) => {
        if (window.confirm("Apakah anda yakin ingin menolak orderan ini?")){
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/decline/" + id;
            axios.post(url)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({message: response.data.message});
                $("message").toast("show");
                this.get_order();
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
    componentDidMount = () => {
        this.get_order();

    }
    
    search = (event) => {
        if (event.keyCode === 13) {
            // $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/product";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
                .then(response => {
                    $("#loading").toast("hide");
                    this.setState({ product: response.data.product });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
    render() {
        console.log(this.state.order)
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-dark">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Data Order</h4>
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
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>ID Address</th>
                                    <th>Total</th>
                                    <th>Bukti bayar</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Opsi</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.order.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id_order}</td>
                                            <td>{item.username}</td>
                                            <td>{item.id_alamat}</td>
                                            <td>{item.total}</td>
                                            <td>{item.bukti_bayar}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.detail.map((it) => {
                                                    return (
                                                        <ul key={it.id_orders}>
                                                            <li>
                                                                {it.nama_produk}
                                                                ({it.quantity})
                                                            </li>
                                                        </ul>
                                                    )
                                                })}
                                            </td>
                                            <button className="m-1 btn btn-sm btn-success"
                                                onClick={() => this.Accept(item.id_order)}>
                                                <span>Accept</span>
                                            </button>
                                            <button className="m-1 btn btn-sm btn-danger"
                                                onClick={() => this.Decline(item.id_order)}>
                                                <span>Decline</span>
                                            </button>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Modal id="modal_accept" title="Accept" bg-header="warning" text_header="white">
                            <form onSubmit={this.Accept}>
                                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                            </button>
                            </form>
                        </Modal>

                        <Modal id="modal_decline" title="Decline" bg-header="warning" text_header="white">
                            <form onSubmit={this.Decline}>
                                <input type="text" className="form-control" name="status" value={this.state.status} onChange={this.bind} placeholder="Status" required />
                                <button type="submit" className="btn btn-dark m-2">
                                    <span className="fa fa-check-circle"></span> Save
                            </button>
                            </form>
                        </Modal>
                    </div>
                </div>


            </div>


        );
    }
}
export default Order