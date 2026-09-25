// ===============================
// QUIZ SOCIALJEUNES
// ===============================

const quizForm = document.getElementById("quizForm");
const resultat = document.getElementById("resultat");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const correctionsElement = document.getElementById("corrections");
const restartBtn = document.getElementById("restartBtn");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");


// ===============================
// BONNES RÉPONSES
// ===============================

const bonnesReponses = {
    q1: "b",
    q2: "a",
    q3: "b",
    q4: "a",
    q5: "b",
    q6: "b",
    q7: "a",
    q8: "b"
};


// ===============================
// QUESTIONS
// ===============================

const questions = {
    q1: "Question 1",
    q2: "Question 2",
    q3: "Question 3",
    q4: "Question 4",
    q5: "Question 5",
    q6: "Question 6",
    q7: "Question 7",
    q8: "Question 8"
};
// ===============================
// BARRE DE PROGRESSION
// ===============================

const toutesLesQuestions = Object.keys(bonnesReponses);

function mettreAJourProgression() {

    let nombreReponses = 0;

    toutesLesQuestions.forEach(function(question) {

        const reponse = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (reponse) {
            nombreReponses++;
        }

    });

    const total = toutesLesQuestions.length;

    const pourcentage = Math.round(
        (nombreReponses / total) * 100
    );

    progressFill.style.width = `${pourcentage}%`;

    progressPercent.textContent = `${pourcentage}%`;

    if (nombreReponses < total) {

        progressText.textContent =
            `Question ${nombreReponses + 1} sur ${total}`;

    } else {

        progressText.textContent =
            "Toutes les questions sont répondues !";

    }
}// Mettre à jour la progression
// lorsqu'une réponse est sélectionnée

const boutonsReponse = document.querySelectorAll(
    '#quizForm input[type="radio"]'
);

boutonsReponse.forEach(function(bouton) {

    bouton.addEventListener("change", function() {

        mettreAJourProgression();

    });

});


// ===============================
// VALIDATION DU QUIZ
// ===============================

quizForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let score = 0;
    let toutesLesQuestions = true;


    // Vérifier toutes les questions
    for (let question in bonnesReponses) {

        const reponse = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (!reponse) {
            toutesLesQuestions = false;
            break;
        }

        if (reponse.value === bonnesReponses[question]) {
            score++;
        }
    }


    // ===============================
    // QUESTION NON RÉPONDUE
    // ===============================

    if (!toutesLesQuestions) {

        alert(
            "⚠️ Tu dois répondre à toutes les questions avant de voir ton résultat."
        );

        return;
    }


    // ===============================
    // SCORE
    // ===============================

    scoreElement.textContent =
        `Tu as obtenu ${score}/8`;


    // ===============================
    // MESSAGE
    // ===============================

    if (score === 8) {

        messageElement.textContent =
            "Excellent ! 🎉 Tu connais très bien les bonnes pratiques.";

    } else if (score >= 6) {

        messageElement.textContent =
            "Très bien ! 👏 Tu as de bonnes connaissances.";

    } else if (score >= 4) {

        messageElement.textContent =
            "Pas mal ! 👍 Tu peux encore améliorer tes réflexes.";

    } else {

        messageElement.textContent =
            "Tu peux encore progresser 💡 Consulte les pages Conseils et Ressources.";
    }


    // ===============================
    // CORRECTIONS
    // ===============================

    correctionsElement.innerHTML = "";

    for (let question in bonnesReponses) {

        const reponse = document.querySelector(
            `input[name="${question}"]:checked`
        );

        const correction = document.createElement("p");

        if (reponse.value === bonnesReponses[question]) {

            correction.textContent =
                `✅ ${questions[question]} : Correct`;

            correction.classList.add("correct");

        } else {

            correction.textContent =
                `❌ ${questions[question]} : Incorrect`;

            correction.classList.add("incorrect");
        }

        correctionsElement.appendChild(correction);
    }


    // Afficher le résultat
    resultat.style.display = "block";


    // Faire défiler vers le résultat
    resultat.scrollIntoView({
        behavior: "smooth"
    });

});


// ===============================
// RECOMMENCER
// ===============================

restartBtn.addEventListener("click", function() {

    quizForm.reset();
    progressFill.style.width = "0%";
progressPercent.textContent = "0%";
progressText.textContent = "Question 1 sur 8";  

    resultat.style.display = "none";

    correctionsElement.innerHTML = "";

    quizForm.scrollIntoView({
        behavior: "smooth"
    });

});