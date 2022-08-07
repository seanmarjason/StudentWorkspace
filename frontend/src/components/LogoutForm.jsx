import axios from 'axios';
import './LogoutForm.css';

// Logout form handler
function handleLogoutSubmit(event, callback) {
  event.preventDefault()
  const url = 'http://localhost:3000/users/logout';

  axios.delete(url)
  .then((response) => {
    if (response.status === 200 && response.data === 'Logout successful!') {
      console.log('Logout successful!');
      callback(false);
    }
  })
  .catch((error) => {
    console.log(error.response.status);
  });
}

const LogoutForm = ({ callback }) =>
<div className="logoutForm">
  <form onSubmit={(event) => handleLogoutSubmit(event, callback)}>
  <div className="button-container">
    <button type="submit">Logout</button>
  </div>
  </form>  
</div>

export { LogoutForm }
