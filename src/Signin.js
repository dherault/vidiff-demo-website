import React, { useState, useEffect } from 'react'
import './Signin.css'

const correctEmail = 'user@vidiff.com'
const correctPassword = 'carrotcake'

function Signin({ history, setIsUserSignedIn }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);

  const handleSubmit = event => {
    event.preventDefault()

    if (email === correctEmail && password === correctPassword) {
      setIsUserSignedIn(true)
      history.push('/')
    }
    else {
      // setEmail('')
      // setPassword('')
      setWarning(true)
    }
  }

  return (
    <div className="Signin">
      <h1>
        Signin
      </h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            id="email"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <input className="Signin-submit" type="submit" value="Sign in" />
        {warning && (
          <div className="Signin-red">
            Incorrect email or password.
          </div>
        )}
      </form>
      <div>
        The email is {correctEmail} and the password is {correctPassword}. You entered {email} - {password}
      </div>
    </div>
  )
}

export default Signin
