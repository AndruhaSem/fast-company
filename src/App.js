import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from "./app/components/navBar";
import Main from "./app/loyouts/main";
import Login from "./app/loyouts/login";
import Users from "./app/loyouts/users";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;
