import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import './index.css'

import Home from './Home'
import About from './About'
import Signin from './Signin'

function App() {

  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  const protectRoute = Component => () => isUserSignedIn ? <Component /> : <Redirect to="/signin" />

  return (
    <Router>
      <div className="App">
        <nav>
          <header>Vidiff demo app</header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {isUserSignedIn && (
              <li>
                <Link to="/signin" onClick={() => setIsUserSignedIn(false)}>Sign out</Link>
              </li>
            )}
          </ul>
        </nav>

        <Route exact path="/" render={protectRoute(Home)} />
        <Route exact path="/about" render={protectRoute(About)} />
        <Route exact path="/signin" render={props => <Signin {...props} setIsUserSignedIn={setIsUserSignedIn} />} />
      </div>
    </Router>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)
