document.addEventListener("DOMContentLoaded", function() {
    const quizData = JSON.parse(localStorage.getItem("quizData"));
    const quizPreview = document.getElementById("quiz-preview");
    const submitButton = document.getElementById("submit-quiz");

    quizData.forEach(questionData => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `
            <h3>${questionData.question}</h3>
        `;
        
        questionData.answers.forEach(answerData => {
            const answerInput = document.createElement("input");
            answerInput.type = "checkbox";
            answerInput.name = questionData.question;
            answerInput.value = answerData.text;
            answerInput.dataset.correct = answerData.correct;
            questionDiv.appendChild(answerInput);

            const answerLabel = document.createElement("label");
            answerLabel.textContent = answerData.text;
            questionDiv.appendChild(answerLabel);

            questionDiv.appendChild(document.createElement("br"));
        });

        quizPreview.appendChild(questionDiv);
    });

    submitButton.addEventListener("click", function() {
        const questions = document.querySelectorAll(".question");
        let score = 0;

        questions.forEach(question => {
            const selectedAnswers = question.querySelectorAll("input:checked");
            const correctAnswers = question.querySelectorAll("input[data-correct=true]");

            let correctSelected = true;
            selectedAnswers.forEach(selectedAnswer => {
                if (!selectedAnswer.dataset.correct) {
                    correctSelected = false;
                }
            });

            let allCorrectSelected = true;
            correctAnswers.forEach(correctAnswer => {
                if (!Array.from(selectedAnswers).includes(correctAnswer)) {
                    allCorrectSelected = false;
                }
            });

            if (correctSelected && allCorrectSelected && correctAnswers.length === selectedAnswers.length && selectedAnswers.length !== 0) {
                score++;
            }
        });

        alert(`Your score is: ${score} out of ${questions.length}`);
    });
});
