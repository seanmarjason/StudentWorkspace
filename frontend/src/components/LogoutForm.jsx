import axios from 'axios';
import './LogoutForm.css';

// Logout form handler
function handleLogoutSubmit(event, setIsLoginSuccess) {
  event.preventDefault()
  const url = 'http://localhost:3000/users/logout';

  axios.delete(url)
  .then((response) => {
    if (response.status === 200 && response.data === 'Logout successful!') {
      console.log('Logout successful!');
      setIsLoginSuccess(false);
    }
  })
  .catch((error) => {
    console.log(error.response.status);
  });
}

const LogoutForm = ({ setIsLoginSuccess }) =>
<div className="logoutForm">
  <form onSubmit={(event) => handleLogoutSubmit(event, setIsLoginSuccess)}>
  <div className="button-container">
    <button type="submit">Logout</button>
  </div>
  </form>  
</div>

export { LogoutForm }
