document.getElementById('translateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;
    const text = document.getElementById('text').value;
    const token = localStorage.getItem('token');
    

    const requestData = {
      sourceLang: sourceLang,
      targetLang: targetLang,
      text: text
    };

    console.log("Gönderilen token:", token);
    fetch("http://localhost:8080/api/v1/translate", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('result').classList.remove('d-none'); 
      document.getElementById('translatedText').innerText = data; 
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    });
  });