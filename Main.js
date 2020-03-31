import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Products from "./page/Products";
import Navbar from "./component/Navbar";
import Profil from "./page/Profil";
import Login from "./page/Login";
import Register from "./page/Register";
import Cart from "./client/cart";
import Product from "./client/product";
import ProductItem from "./client/ProductItem";
import User from "./page/User";
import User1 from "./client/User1";
import Order from "./page/Order";
import Checkout from "./page/Checkout";

class Main extends Component{
    render = () => {
        return(
            <Switch>
                <Route path="/products">
                <Navbar />
                <Products />
                </Route>

                <Route path="/user">
                <Navbar />
                <User />
                </Route>

                <Route path="/user1">
                <Navbar />
                <User1 />
                </Route>

                <Route path="/profil">
                <Navbar />
                <Profil />
                </Route>

                <Route path="/login">
                <Navbar />
                <Login />
                </Route>

                <Route path="/register">
                <Navbar />
                <Register />
                </Route>
                
                <Route path="/cart">
                <Navbar />
                <Cart />
                </Route>

                <Route path="/product">
                <Navbar />
                <Product />
                </Route>

                <Route path="/productitem">
                <Navbar />
                <productitem />
                </Route>

                <Route path="/Order">
                <Navbar />
                <Order />
                </Route>

                <Route path="/checkout">
                <Navbar />
                <Checkout />
                </Route>
            </Switch>
        );
    }
}

export default Main;
