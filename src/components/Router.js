import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Landing from "./Landing";




const Router = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Landing}/>
            <Route path='/shop/:shopId' component={App}/>

        </Switch>
        </BrowserRouter>
    )
}

export default Router;