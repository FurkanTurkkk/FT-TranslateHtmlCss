$(document).ready(function () {
    const token = localStorage.getItem('token');

    fetch("http://localhost:8080/api/v1/word/all", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let tableBody = $("#wordsTable tbody");
            tableBody.empty();

            if (data.length === 0) {
                $(".header-text").text("Henüz kelime bulunmuyor!");
                return;
            }

            data.forEach((word, index) => {
                tableBody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${word.originalWord}</td>
                    <td>${word.translatedWord}</td>
                </tr>
            `);
            });

            $("#wordsTable").removeClass("d-none");
        })
        .catch(error => {
            console.error("Veri çekme hatası:", error);
            $(".header-text").text("Kelimeler yüklenirken hata oluştu!");
        });
});