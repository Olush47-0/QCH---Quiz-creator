document.addEventListener("DOMContentLoaded", function() {
    const addQuestionButton = document.getElementById("add-question");
    const createQuizButton = document.getElementById("create-quiz");
    const questionsContainer = document.getElementById("questions");

    addQuestionButton.addEventListener("click", function() {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `
            <input type="text" class="question-input" placeholder="Question">
            <div class="answers">
                <input type="text" class="answer-input" placeholder="Answer">
                <input type="checkbox" class="correct-answer"> Correct
            </div>
            <button class="add-answer">Add Answer</button>
        `;
        questionsContainer.appendChild(questionDiv);
    });

    questionsContainer.addEventListener("click", function(event) {
        if (event.target.classList.contains("add-answer")) {
            const questionDiv = event.target.closest(".question");
            const answersDiv = questionDiv.querySelector(".answers");

            const answerInput = document.createElement("input");
            answerInput.type = "text";
            answerInput.classList.add("answer-input");
            answerInput.placeholder = "Answer";

            const correctCheckbox = document.createElement("input");
            correctCheckbox.type = "checkbox";
            correctCheckbox.classList.add("correct-answer");
            correctCheckbox.id = "correct-answer";
            const correctLabel = document.createElement("label");
            correctLabel.htmlFor = "correct-answer";
            correctLabel.textContent = "Correct";

            answersDiv.appendChild(document.createElement("br"));
            answersDiv.appendChild(answerInput);
            answersDiv.appendChild(correctCheckbox);
            answersDiv.appendChild(correctLabel);
        }
    });

    createQuizButton.addEventListener("click", function() {
        const questions = document.querySelectorAll(".question");
        const quizData = [];

        let allQuestionsValid = true;

        questions.forEach(question => {
            const questionText = question.querySelector(".question-input").value;
            const answers = [];
            const answerInputs = question.querySelectorAll(".answer-input");
            const correctAnswerCheckboxes = question.querySelectorAll(".correct-answer");

            let anyCorrect = false;

            answerInputs.forEach((answerInput, index) => {
                if (answerInput.value.trim() !== '') {
                    const isCorrect = correctAnswerCheckboxes[index].checked;
                    answers.push({
                        text: answerInput.value,
                        correct: isCorrect
                    });
                    if (isCorrect) {
                        anyCorrect = true;
                    }
                }
            });

            if (!anyCorrect) {
                allQuestionsValid = false;
            }

            quizData.push({ question: questionText, answers: answers });
        });

        if (!allQuestionsValid) {
            alert("Please select a correct answer for each question.");
            return;
        }

        localStorage.setItem("quizData", JSON.stringify(quizData));
        window.open("quiz-preview.html", "_blank");
    });
});
