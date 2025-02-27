$(document).ready(function () {
    const token = localStorage.getItem('token');
    fetch("http://localhost:8080/api/v1/quiz/results", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let tableBody = $("#quizTable tbody");
            tableBody.empty();

            if (data.length === 0) {
                $(".header-text").text("Henüz quiz sonucu yok!");
                $("#loading").hide();
                return;
            }

            data.forEach((result, index) => {
                tableBody.append(`
                <tr>
                    <td>${index + 1}</td>
                    <td>${result.correctCount}</td>
                    <td>${result.wrongCount}</td>
                    <td>${result.totalQuestions}</td>
                    <td>${result.percentage.toFixed(2)}%</td>
                </tr>
            `);
            });

            $("#loading").hide();
            $("#quizTable").removeClass("d-none");
        })
        .catch(error => {
            console.error("Veri çekme hatası:", error);
            $(".header-text").text("Quiz sonuçları yüklenirken hata oluştu!");
            $("#loading").hide();
        });
});