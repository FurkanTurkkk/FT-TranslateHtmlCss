function deleteAccount() {
    if (confirm('Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
        fetch('http://localhost:8080/api/v1/user/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(response => {
                if (response.ok) {
                    alert('Hesabınız başarıyla silindi.');
                    window.location.href = 'login.html'; 
                } else {
                    alert('Hesap silinirken bir hata oluştu.');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            });
    }
}