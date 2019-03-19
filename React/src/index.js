import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Route,BrowserRouter,Switch } from 'react-router-dom'

import './index.css'
import Main from './js/Main'
import blogDisplay from './js/blogDisplay'


class SiteRouter extends BrowserRouter {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path='/' component={Main}/>
                    <Route path='/blog/:number' component={blogDisplay}/>
                </div>
            </BrowserRouter>
        );
    }
}



//=========================================================
ReactDOM.render(
    <SiteRouter/>,
    document.getElementById('root')
);