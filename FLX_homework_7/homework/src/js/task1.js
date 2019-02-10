const login = prompt("Please log in").trim();

if (login === 'User' || login === 'Admin') {
  const password = prompt("Please, type the password").trim();

  if ((login === 'User' && password === 'UserPass') ||
    (login === 'Admin' && password === 'RootPass')) {

    if (new Date().getHours() < 20) {
      if (login === 'User') {
        alert("Good day, dear User!");
      } else {
        alert("Good day, dear Admin!");
      }
    } else {
      if (login === 'User') {
        alert("Good evening, dear User!");
      } else {
        alert("Good evening, dear Admin!");
      }
    }

  } else if (!password) {
    alert("Canceled");
  } else {
    alert("Wrong password");
  }

} else if (!login) {
  alert("Canceled");
} else if (login.length < 4) {
  alert("I don't know any users having name length less than 4 symbols");
} else {
  alert("I don’t know you");
}
