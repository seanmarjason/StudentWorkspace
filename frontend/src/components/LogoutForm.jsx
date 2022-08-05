import axios from 'axios';

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
  <form onSubmit={(event) => handleLogoutSubmit(event, callback)}>
  <div className="button-container">
    <button type="submit">Logout</button>
  </div>
  </form>  

export { LogoutForm }
