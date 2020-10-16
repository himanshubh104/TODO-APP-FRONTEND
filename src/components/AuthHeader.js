export function authHeader() {
    const user = JSON.parse(localStorage.getItem('auth-user'));
  
    if (user && user.jwt) {
        return { Authorization: 'Bearer ' + user.jwt };
    } else {
      return {};
    }
  }
  