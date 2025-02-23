window.onload = function() {
  // თუ მომხმარებელი დარეგისტრირებულია, ნახავს მის მონაცემებს
  const username = localStorage.getItem('username');
  if (username) {
    document.getElementById('username').textContent = username;

    // როდესაც დააჭერთ მომხმარებელზე, გამოიჩინოს dropdown
    document.getElementById('userBtn').onclick = function() {
      document.getElementById('dropdownContent').classList.toggle('show');
    };

    // ლოგინის შემდეგ გამოსვლა
    document.getElementById('logoutBtn').onclick = function() {
      localStorage.removeItem('username');
      window.location.reload();
    };
  } else {
    // თუ მომხმარებელი არ არის შესული, გადამისამართება ლოგინ გვერდზე
    document.getElementById('userBtn').onclick = function() {
      window.location.href = 'login.html';
    };
  }
};

// ხელახლა შესვლისთვის გადამისამართება
document.getElementById('addBtn').onclick = function() {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'login.html';
  } else {
    window.location.href = 'add.html';
  }
};

// Facebook-ის ავტორიზაციის ფუნქცია
function signInWithFacebook() {
  firebase.auth().signInWithPopup(facebookProvider)
    .then((result) => {
      // აიღე მომხმარებლის ინფორმაცია
      const user = result.user;
      // ატვირთე მომხმარებლის სახელები და ქოლექციები
      localStorage.setItem('username', user.displayName);
      document.getElementById('username').textContent = user.displayName;
      window.location.reload();
    })
    .catch((error) => {
      console.error(error.message);
      alert("შეცდომა: " + error.message);
    });
}

// Facebook შესვლის ღილაკის ფუნქცია
document.getElementById('facebook-login').addEventListener('click', signInWithFacebook);
