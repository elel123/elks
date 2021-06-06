import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SITE_PAGES } from "./constants/links";

import PageLayout from "./components/PageLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Report from "./pages/Report";
import Vis3 from "./pages/Vis3";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Custom404 from "./pages/Custom404";
import AdminView from "./pages/AdminView";


function App() {
    const [isAdmin, setAdmin] = useState(false);
    const [logIn, setLogIn] = useState(false);

    return (
        <Router>
            {/* Switch gurantees that a URL can match to only one route */}
            <PageLayout loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}}>
                <Switch>
                    {/* Login */}
                    <Route exact path={SITE_PAGES.LOGIN}>
                        <Login loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}} />
                    </Route>
                    {/* Logout Confirmation */}
                    <Route exact path={SITE_PAGES.LOGOUT}>
                        <Logout />
                    </Route>
                    {/* Landing Page Upon Login */}
                    <Route exact path={SITE_PAGES.LANDING}>
                        <Landing />
                    </Route>
                    {/* Visualization Page */}
                    <Route exact path={SITE_PAGES.DASH}>
                        <Dashboard loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}} />
                    </Route>
                    {/* Visualization Page */}
                    <Route exact path={SITE_PAGES.REPORT}>
                        <Report loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}} />
                    </Route>
                    {/* Visualization Page */}
                    <Route exact path={SITE_PAGES.VIS3}>
                        <Vis3 loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}} />
                    </Route>

                    {/* Admin Page */}
                    <Route exact path={SITE_PAGES.ADMIN}>
                        <AdminView loginState={{logIn, setLogIn}} adminState={{isAdmin, setAdmin}} />
                    </Route>

                    {/* Any other URL is automatically matched to 404 Page */}
                    <Route path="/">
                        <Custom404 />
                    </Route>
                </Switch>
            </PageLayout>
        </Router>
    );
}

export default App;
