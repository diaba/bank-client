1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
	
import React from 'react';
 
function Dashboard(props) {
 
  // handle click event of logout button
  const handleLogout = () => {    
    props.history.push('/login');
  }
 
  return (
    <div>
      Welcome User!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;