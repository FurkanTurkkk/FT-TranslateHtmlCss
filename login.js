document.getElementById("register-btn").addEventListener("click", function () {
    window.location.href = "register.html";
});



document.getElementById('login-btn').addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');

    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

    fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {

            return response.text().then(text => {
                let errorMsg = "Giriş başarısız";
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
    .then(token => {
        localStorage.setItem("token", token.trim());
        window.location.href = 'homepage.html';
    })
    .catch(error => {
        console.error("Hata:", error);
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    });
});