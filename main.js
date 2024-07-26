let rightQuestion = 0; // Variable zur Verfolgung der richtigen Antworten
let currentQuestion = 0; // Variable zur Verfolgung der aktuellen Frage
let AUDIO_SUCCESS = new Audio('sound/succes.mp3');
let AUDIO_DANGER = new Audio('sound/danger.mp3');


// Diese Funktion initialisiert das Quiz, indem sie die Anzahl der Fragen anzeigt und die erste Frage anzeigt.
function pages() {
    document.getElementById('all-question').innerHTML = questions.length; // Anzahl der Fragen anzeigen

    showQuestion(); // Die showQuestion-Funktion wird aufgerufen, um die erste Frage anzuzeigen.
}

// Diese Funktion zeigt die aktuelle Frage und ihre Optionen im HTML an.
function showQuestion() {
    AUDIO_SUCCESS.volume = 0.05;
    AUDIO_DANGER.volume = 0.05;
    
    if (currentQuestion >= questions.length) {
        // Wenn alle Fragen beantwortet wurden, wird der Endbildschirm angezeigt.
        document.getElementById('endscreenBody').classList.remove('dNone');
        document.getElementById('endScreenImg').classList.remove('dNone');
        document.getElementById('finischQuiz').classList.add('dNone');
        document.getElementById('headerImg').classList.add('dNone');
        document.getElementById('navBar').classList.add('dNone');
        document.getElementById('progress-bar').classList.add('dNone');
        document.getElementById('amountOfQuestion').innerHTML = questions.length;
        document.getElementById('amountOfRightQuestion').innerHTML = rightQuestion;
    } else {
        // Andernfalls wird die aktuelle Frage und ihre Optionen im HTML angezeigt.
        let question = questions[currentQuestion];
        let percent = (currentQuestion + 1) / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent}%`
        document.getElementById('progress-bar').style.width = `${percent}%`

        document.getElementById('questionNumber').innerHTML = currentQuestion + 1;
        document.getElementById('questionText').innerHTML = question['question'];
        document.getElementById('headerImg').src = question['quizImg'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

// Diese Funktion verarbeitet die vom Benutzer ausgewählte Antwort und zeigt das visuelle Feedback.
function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).parentNode.classList.add('disable-click');
    }
    if (selectedQuestionNumber == question['right_answer']) {
        // Wenn die Antwort richtig ist, wird die 'bg-success'-Klasse hinzugefügt und die Anzahl der richtigen Antworten erhöht.
        document.getElementById(selection).parentNode.classList.add('bg-success');
        document.getElementById(selection).parentNode.classList.add('disable-click');
        AUDIO_SUCCESS.play();

        rightQuestion++;

    } else {
        // Wenn die Antwort falsch ist, wird die 'bg-danger'-Klasse hinzugefügt, und die richtige Antwort wird hervorgehoben.
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        document.getElementById(selection).parentNode.classList.add('disable-click');
        AUDIO_DANGER.play();
    }
    document.getElementById('nextButton').disabled = false; // Der "Weiter"-Button wird aktiviert.
}

// Diese Funktion wechselt zur nächsten Frage und aktualisiert die Anzeige.
function nextQuestion() {
    currentQuestion++; // currentQuestion wird um 1 erhöht, um zur nächsten Frage zu wechseln.
    document.getElementById('nextButton').disabled = true; // Der "Weiter"-Button wird deaktiviert.
    resetAnswerButton(); // Die Antwortbuttons werden zurückgesetzt.

    // Überprüfen, ob die Person gewonnen oder verloren hat
    if (rightQuestion === 10) {
        // Person hat gewonnen, der Gewinnbildschirm wird angezeigt.
        document.getElementById('endscreenBody').classList.remove('dNone');
        document.getElementById('endScreenImg').classList.remove('dNone');
        document.getElementById('finischQuiz').classList.add('dNone');
        document.getElementById('navBar').classList.add('dNone');
        document.getElementById('headerImg').classList.add('dNone');
        document.getElementById('progress-bar').classList.add('dNone');
        document.getElementById('amountOfQuestion').innerHTML = questions.length;
        document.getElementById('amountOfRightQuestion').innerHTML = rightQuestion;
        document.getElementById('win').classList.remove('dNone');
    } else if (rightQuestion < 10 && currentQuestion < questions.length) {
        // Person hat noch nicht gewonnen und es gibt noch Fragen übrig, also wird die nächste Frage angezeigt.
        showQuestion();
    } else if (rightQuestion < 10 && currentQuestion >= questions.length) {
        // Person hat verloren, da es keine Fragen mehr gibt, der Verlustbildschirm wird angezeigt.
        document.getElementById('endscreenBody').classList.remove('dNone');
        document.getElementById('endScreenImg').classList.remove('dNone');
        document.getElementById('finischQuiz').classList.add('dNone');
        document.getElementById('navBar').classList.add('dNone');
        document.getElementById('headerImg').classList.add('dNone');
        document.getElementById('progress-bar').classList.add('dNone');
        document.getElementById('amountOfQuestion').innerHTML = questions.length;
        document.getElementById('amountOfRightQuestion').innerHTML = rightQuestion;
        document.getElementById('lose').classList.remove('dNone');
    }
}

// Diese Funktion setzt das visuelle Feedback der Antwortbuttons zurück.
function resetAnswerButton() {
    // Schleife durch die Antwort-Elemente
    for (let i = 1; i <= 4; i++) {
        const answerElement = document.getElementById(`answer_${i}`);
        const parentNode = answerElement.parentNode;
        // Entfernt beide Klassen ('bg-danger' und 'bg-success') vom übergeordneten Element.
        parentNode.classList.remove('bg-danger', 'bg-success', 'disable-click');
    }
}

// Diese Funktion ermöglicht das Drücken der Enter-Taste, um zur nächsten Frage zu gelangen.
document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        document.getElementById('nextButton').click();
    }
});

// Diese Funktion startet das Quiz neu, indem sie alle Elemente auf den Anfangszustand zurücksetzt.
function restart() {
    document.getElementById('endscreenBody').classList.add('dNone');
    document.getElementById('endScreenImg').classList.add('dNone');
    document.getElementById('finischQuiz').classList.remove('dNone');
    document.getElementById('navBar').classList.remove('dNone');
    document.getElementById('headerImg').classList.remove('dNone');
    document.getElementById('progress-bar').classList.remove('dNone');
    document.getElementById('win').classList.add('dNone');
    document.getElementById('lose').classList.add('dNone');
    currentQuestion = 0; // Zurücksetzen der aktuellen Frage auf den Anfang
    rightQuestion = 0; // Zurücksetzen der Anzahl der richtigen Antworten auf den Anfang
    pages(); // Initialisierung des Quiz erneut
}
