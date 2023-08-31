document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const scoreElement = document.getElementById('score');
    const operand1Input = document.getElementById('operand1');
    const operand2Input = document.getElementById('operand2');
    const userAnswerInput = document.getElementById('userAnswer');
    const answerButton = document.getElementById('answerButton');
    const resultText = document.getElementById('resultText');

    const operatorRadios = document.getElementsByName('operator');
    const radioText = document.getElementById('radioText');

    let score = 0;
    let totalQuestions = 0;
    let selectedOperator = "+";
    let canGenerateQuestion = false;

    function generateQuestion() {
        if (canGenerateQuestion) {
            operand1Input.value = Math.floor(Math.random() * 10);
            operand2Input.value = Math.floor(Math.random() * 10);
        }
    }

    function checkAnswer() {
        if (userAnswerInput.value === '') {
            resultText.textContent = 'กรุณาเติมคำตอบ';
            resultText.classList.remove('correct', 'wrong');
            resultText.classList.add('empty');
            return;
        }

        const num1 = parseFloat(operand1Input.value);
        const num2 = parseFloat(operand2Input.value);
        const userAnswer = parseFloat(userAnswerInput.value);

        const precision = 2;
        const correctAnswer = (selectedOperator === 'add') ? (num1 + num2) :
                             (selectedOperator === 'subtract') ? (num1 - num2) :
                             (selectedOperator === 'multiply') ? (num1 * num2) :
                             (selectedOperator === 'divide') ? (num1 / num2) : 0;
        const correctAnswerRounded = correctAnswer.toFixed(precision);
        const userAnswerRounded = userAnswer.toFixed(precision);

        if (userAnswerRounded === correctAnswerRounded) {
            resultText.textContent = 'คำตอบถูกต้อง!';
            resultText.classList.remove('empty', 'wrong');
            resultText.classList.add('correct');
            score++;
            scoreElement.textContent =  `คะแนน: ${score} จาก ${totalQuestions}`;
        } else {
            resultText.textContent = 'คำตอบผิด ลองตอบใหม่';
            resultText.classList.remove('empty', 'correct');
            resultText.classList.add('wrong');
        }

        totalQuestions++;
        generateQuestion();
        userAnswerInput.value = '';
        scoreElement.textContent =  `คะแนน: ${score} จาก ${totalQuestions}`;
    }

    startButton.addEventListener('click', function () {
        score = 0;
        totalQuestions = 1;
        scoreElement.textContent = 'คะแนน:';
        canGenerateQuestion = true;
        generateQuestion();
        resultText.textContent = '';
        setDefaultOperator();
    });

    function setDefaultOperator() {
        operatorRadios[0].checked = true;
        selectedOperator = operatorRadios[0].value;
        radioText.textContent = '+';
    }

    for (let i = 0; i < operatorRadios.length; i++) {
        operatorRadios[i].addEventListener('change', function () {
            selectedOperator = operatorRadios[i].value;
            radioText.textContent = operatorRadios[i].nextSibling.textContent.trim();

            if (userAnswerInput.value !== '') {
                generateQuestion();
                resultText.textContent = '';
            }
        });
    }

    answerButton.addEventListener('click', checkAnswer);

    setDefaultOperator();

    generateQuestion();
});
