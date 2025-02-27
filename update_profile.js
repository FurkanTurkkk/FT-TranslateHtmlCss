fetch('http://localhost:8080/api/v1/user/find-by-user-id', {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
})
    .then(response => response.json())
    .then(data => {
        document.getElementById('account-name').value = data.name || '';
        document.getElementById('account-surname').value = data.surname || '';
        document.getElementById('account-username').value = data.username || '';
        document.getElementById('account-email').value = data.email || '';
        document.getElementById('account-phoneNumber').value = data.phoneNumber || '';
    })
    .catch(error => {
        ƒ
        console.error('Hata:', error);
    });




document.getElementById('accountSettingsForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const updatedData = {
        email: document.getElementById('account-email').value,
        phoneNumber: document.getElementById('account-phoneNumber').value
    };

    const token = localStorage.getItem('token');
    if (!token) {
        alert("Token bulunamadı, lütfen giriş yapın!");
        return;
    }

    fetch('http://localhost:8080/api/v1/user/update', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(err => { throw new Error(err); });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Profiliniz başarıyla güncellendi!');

                window.location.href = 'homepage.html'
            } else {
                alert(data.message || 'Bir hata oluştu');
            }
        })
        .catch(error => {
            console.error('Hata:', error);
            alert(error.message || 'Güncelleme sırasında hata oluştu');
        });
});
