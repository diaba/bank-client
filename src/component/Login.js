import React, { useState, Component } from 'react';

class Login extends Component {
  constructor(props) {
      super(props)

      this.state ={
          username:'',
          password:''
      }
  }
  changeHandler= e =>{
      this.setState({ [e.target.name]: e.target.value})
  }
  submitHandler= e =>{
      e.preventDefault()
      console.log(this.state);
      
      var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
"email": this.state.username,
"password": this.state.password
});

var requestOptions = {
method: 'POST',
headers: myHeaders,
body: raw,
redirect: 'follow'
};

fetch("http://localhost:9092/auth/users/login", requestOptions)
.then(response => response.text())
.then(result => {
  this.props.history.push('/dashboard')
  localStorage.setItem("token",result.jwt)
  console.log("token",result.token)
  if (result.ok){
    return result.json().then((result) =>{
      console.log("result ok", result.jwt)
      localStorage.setItem('login', JSON.stringify({
        login:true,
        token:result.jwt
      }));
      
    })
  }})
.catch(error => console.log('error', error));
}
  
  render() { 
      const { username, password } = this.state
  return (
    <div>
      Login<br /><br />
     
      <form onSubmit={ this.submitHandler }>
  <label>
    Name:
    <input type="text" name="username" value = { username } onChange={ this.changeHandler} />
  </label>
  <label>
    password:
    <input type="text" name="password" value = { password }  onChange={ this.changeHandler}/>
  </label>
  <input type="submit" value="Submit" />
</form>
    </div>
  );
}

}
export default Login;