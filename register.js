document.getElementById("login-btn").addEventListener("click", function () {
  window.location.href = "login.html";
});

document.getElementById('register-btn').addEventListener("click", function (event) {
  event.preventDefault();

  const name = document.getElementById('reg-name').value;
  const surname = document.getElementById('reg-surname').value;
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const rePassword = document.getElementById('reg-re-password').value;
  const errorDiv = document.getElementById('error-message');

  document.getElementById("reg-name-error").textContent = "";
  document.getElementById("reg-surname-error").textContent = "";
  document.getElementById("reg-username-error").textContent = "";
  document.getElementById("reg-password-error").textContent = "";

  errorDiv.textContent = '';
  errorDiv.style.display = 'none';
  let hasError = false;

  if(name === ""){
    document.getElementById("reg-name-error").textContent = "İsim bölümü boş olamaz";
    hasError = true;
  }

  if(surname === ""){
    document.getElementById("reg-surname-error").textContent = "Soyisim bölümü boş olamaz";
    hasError = true;
  }

  if(username === ""){
    document.getElementById("reg-username-error").textContent = "Username bölümü boş olamaz";
    hasError = true;
  }

  if(password === ""){
    document.getElementById("reg-password-error").textContent = "Şifre bölümü boş olamaz";
    hasError = true;
  }

  if(hasError) return;

  const registerData = { name, surname, username, password, rePassword };

  fetch("http://localhost:8080/api/v1/register", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerData)
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          let errorMsg = "Kayıt başarısız";
          try {
            const json = JSON.parse(text);
            errorMsg = json.error || json.message || text;
          } catch {
            errorMsg = text;
          }
          throw new Error(errorMsg);
        });
      }
      return response.text();
    })
    .then(message => {
      console.log('Kayıt başarılı:', message);
      window.alert("Kayıt Başarılı! Giriş Ekranına Yönlendiriliyorsunuz...");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    })
    .catch(error => {
      console.error('Kayıt yapılırken hata oluştu:', error);
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';

      setTimeout(() => {
        errorDiv.style.display = 'none';
      }, 3000);
    });
});
