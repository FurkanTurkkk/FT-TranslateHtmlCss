document.addEventListener('DOMContentLoaded', function () {
    const quizForm = document.getElementById("quizForm");
    const formCard = document.getElementById("formCard");
    const quizContainer = document.getElementById("quizContainer");
    const resultContainer = document.getElementById("resultContainer");
    const questionNumberEl = document.getElementById("questionNumber");
    const questionPromptEl = document.getElementById("questionPrompt");
    const optionsContainer = document.getElementById("optionsContainer");
    const nextButton = document.getElementById("nextButton");
    const resultText = document.getElementById("resultText");

    const token = localStorage.getItem('token');
    let quizData = [];
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let selectedAnswer = null;

    quizForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const sourceLang = document.getElementById("sourceLang").value;
      const targetLang = document.getElementById("targetLang").value;
      const quizSize = document.getElementById("quizSize").value;
      const optionCount = document.getElementById("optionCount").value;

      const quizUrl = `http://localhost:8080/api/v1/quiz/generate?sourceLang=${sourceLang}&targetLang=${targetLang}&quizSize=${quizSize}&optionCount=${optionCount}`;
      fetch(quizUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(errData => { throw new Error(errData.error || "Bir hata oluştu"); });
          }
          return response.json();
        })
        .then(data => {
          quizData = data;
          if (!Array.isArray(quizData)) {
            throw new Error("Quiz verisi beklenmedik formatta.");
          }
          formCard.classList.add('d-none');
          quizContainer.classList.remove('d-none');
          currentQuestionIndex = 0;
          correctCount = 0;
          displayCurrentQuestion();
        })
        .catch(error => {
          console.error("Quiz verisi alınırken hata:", error);
          alert("Quiz verisi alınırken hata: " + error.message);
        });
    });

    function displayCurrentQuestion() {
      optionsContainer.innerHTML = "";
      selectedAnswer = null;
      nextButton.disabled = true;

      const currentQuestion = quizData[currentQuestionIndex];
      questionNumberEl.textContent = `Soru ${currentQuestionIndex + 1}`;
      questionPromptEl.textContent = currentQuestion.template;
      console.log(currentQuestion);
      currentQuestion.optionList.forEach(option => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "list-group-item list-group-item-action";
        btn.textContent = option;
        btn.addEventListener("click", function () {
          Array.from(optionsContainer.children).forEach(child => child.classList.remove("active"));
          btn.classList.add("active");
          selectedAnswer = option;
          nextButton.disabled = false;
        });
        optionsContainer.appendChild(btn);
      });

      if (currentQuestionIndex === quizData.length - 1) {
        nextButton.textContent = "Bitir";
      } else {
        nextButton.textContent = "Sonraki";
      }
    }

    nextButton.addEventListener("click", function () {
      const currentQuestion = quizData[currentQuestionIndex];
      if (selectedAnswer === currentQuestion.correctAnswer) {
        correctCount++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        displayCurrentQuestion();
      } else {
        finishQuiz();
      }
    });

    function finishQuiz() {
      quizContainer.classList.add("d-none");
      resultContainer.classList.remove("d-none");
      const totalQuestions = quizData.length;
      const percentage = (correctCount / totalQuestions) * 100;
      resultText.textContent = `Doğru Sayısı: ${correctCount} / ${totalQuestions} - Başarı Yüzdesi: ${percentage.toFixed(2)}%`;
      fetch("http://localhost:8080/api/v1/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          correctCount: correctCount,
          totalQuestions: totalQuestions,
        }),
      })
        .then((response) => response.text())
        .then((data) => console.log(data))
        .catch((error) => console.error("Hata:", error));
      setTimeout(() => {
        window.location.href = "homepage.html";
      }, 3000);
    }
  });