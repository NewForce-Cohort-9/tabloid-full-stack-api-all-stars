import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import { ApplicationViews } from "./components/Views/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './components/Authorize';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [currentUser, setCurrentUser] = useState({})

    const user = localStorage.getItem("userProfile")
    const parsedUser = JSON.parse(user)

    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    useEffect(() => {
        if (parsedUser) {
            setCurrentUser(parsedUser)
        }
    }, [parsedUser])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser}/>
            {isLoggedIn ?
                <ApplicationViews currentUser={currentUser} />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
        </Router>
    );
}

export default App;