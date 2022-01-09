import React, { useState } from 'react';
import { setUserSession } from './component/Utils/Common';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);





    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": data.get('email'),
  "password": data.get('password')

});


var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
  
  fetch("http://localhost:9092/auth/users/login", requestOptions)
    .then(response => 
      {
        console.log(response)
        if (response.ok){
          return response.json().then((result) =>{
            console.warn("result", result)
            localStorage.setItem('login', JSON.stringify({
              login:true,
              token:result.jwt
            }))
          })
        }
       throw Error(response.status)
      }
      
      )
    .then(result => {
  
        setLoading(false);
        setUserSession(result.token, "response.data.user");
    //   localStorage.setItem("token",result.token)
      props.history.push('/dashboard');
    })
    .catch(error => {
        setLoading(false);
        console.log('error', error);
    });
  }

    // axios.post('http://localhost:4000/users/signin',
    //  { username: username.value, password: password.value }).then(response => {
    //   setLoading(false);
    //   setUserSession(response.data.token, response.data.user);
    //   props.history.push('/dashboard');
    // }).catch(error => {
    //   setLoading(false);
    //   if (error.response.status === 401) setError(error.response.data.message);
    //   else setError("Something went wrong. Please try again later.");
    // });
  

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;