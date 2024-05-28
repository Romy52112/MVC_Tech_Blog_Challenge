const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('input[name="username"]').value.trim();
  const password = document.querySelector('input[name="password"]').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

// const loginFormHandler = async (event) => {
//   event.preventDefault();

//   const username = document.querySelector('input[name="username"]').value.trim();
//   const password = document.querySelector('input[name="password"]').value.trim();

//   if (username && password) {
//     // Disable the submit button to prevent multiple submissions
//     const submitButton = document.querySelector('#login-form button[type="submit"]');
//     submitButton.disabled = true;
//     submitButton.textContent = 'Logging in...';

//     try {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ username, password }),
//         headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.ok) {
//         document.location.replace('/');
//       } else {
//         const errorData = await response.json();
//         alert(`Failed to log in: ${errorData.message || response.statusText}`);
//         // Clear the password field
//         document.querySelector('input[name="password"]').value = '';
//       }
//     } catch (error) {
//       alert(`Failed to log in: ${error.message}`);
//       // Clear the password field
//       document.querySelector('input[name="password"]').value = '';
//     } finally {
//       // Re-enable the submit button
//       submitButton.disabled = false;
//       submitButton.textContent = 'Log In';
//     }
//   } else {
//     alert('Username and password cannot be empty.');
//   }
// };

// document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
