function goToPage(page) {
    switch (page) {
        case 'home':
            window.location.href = "homepage.html";
            break;
        case 'quizzes':
            window.location.href = "quiz_results.html";
            break;
        case 'words':
            window.location.href = "words.html";
            break;
        case 'startQuiz':
            window.location.href = "quiz.html";
            break;
        case 'translate':
            window.location.href = "translation.html";
            break;
        case 'settings':
            window.location.href = "settings.html";
            break;
        case 'accountSettings':
            window.location.href = "account_settings.html";
            break;
        default:
            console.log('Sayfa bulunamadı!');
    }
}

