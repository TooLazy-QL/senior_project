import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import ProfileSeller from './ProfileSellerComponent';
import ProfileBuyer from './ProfileBuyerComponent';
import Search from './SearchComponent';
import Favorite from './FavoriteComponent';
import Shoppingcart from './ShoppingcartComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

class Main extends Component {
    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route exact path="/aboutus" component={About}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route exact path="/profileseller" component={ProfileSeller}/>
                    <Route exact path="/profilebuyer" component={ProfileBuyer}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/favorite" component={Favorite}/>
                    <Route exact path="/shoppingcart" component={Shoppingcart}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(Main);