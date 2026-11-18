// =================================
// 1. Quiz Questions
// =================================

const quizQuestions = [

    {
        question: "ما العامل الرئيسي المسؤول عن تكوين الكثبان الرملية؟",
        englishQuestion: "What is the main factor responsible for forming sand dunes?",

        options: [
            "المياه الجارية",
            "الرياح",
            "النشاط البركاني",
            "الأمواج البحرية"
        ],

        englishOptions: [
            "Running water",
            "Wind",
            "Volcanic activity",
            "Ocean waves"
        ],

        correct: 1,

        explanation: "تنقل الرياح حبيبات الرمال ثم تترسب عندما تقل سرعتها، فتتكون الكثبان الرملية.",
        englishExplanation: "Wind transports sand grains and deposits them as its speed decreases, forming sand dunes."
    },

    {
        question: "ما العملية التي تساعد على تكوين تعرجات الأنهار؟",
        englishQuestion: "Which processes help form river meanders?",

        options: [
            "النحت والترسيب",
            "التجوية الكيميائية فقط",
            "النشاط الزلزالي",
            "التبخر"
        ],

        englishOptions: [
            "Erosion and deposition",
            "Chemical weathering only",
            "Seismic activity",
            "Evaporation"
        ],

        correct: 0,

        explanation: "تتكون تعرجات الأنهار نتيجة النحت على جانب المجرى والترسيب على الجانب الآخر.",
        englishExplanation: "River meanders form through erosion on one side of the channel and deposition on the other."
    },

    {
        question: "أين تتكون الدلتا النهرية غالبًا؟",
        englishQuestion: "Where do river deltas usually form?",

        options: [
            "عند منابع الأنهار",
            "في قمم الجبال",
            "عند مصبات الأنهار",
            "في الصحاري"
        ],

        englishOptions: [
            "At river sources",
            "On mountain peaks",
            "At river mouths",
            "In deserts"
        ],

        correct: 2,

        explanation: "تتكون الدلتا عند مصب النهر نتيجة تراكم الرواسب التي يحملها النهر.",
        englishExplanation: "Deltas form at river mouths as sediments carried by the river accumulate."
    },

    {
        question: "ما التقنية المناسبة لرصد الأنماط الزراعية من الأعلى؟",
        englishQuestion: "Which technology is suitable for observing agricultural patterns from above?",

        options: [
            "الاستشعار عن بعد",
            "قياس الضغط الجوي",
            "المسح الصوتي فقط",
            "قياس سرعة الرياح"
        ],

        englishOptions: [
            "Remote sensing",
            "Atmospheric pressure measurement",
            "Acoustic surveying only",
            "Wind speed measurement"
        ],

        correct: 0,

        explanation: "تساعد صور الأقمار الصناعية وتقنيات الاستشعار عن بعد على رصد الأنماط الزراعية وتحليلها.",
        englishExplanation: "Satellite imagery and remote sensing help detect and analyze agricultural patterns."
    },

    {
        question: "ما الذي يميز الشعاب المرجانية في الصور الفضائية؟",
        englishQuestion: "What makes coral reefs distinctive in satellite imagery?",

        options: [
            "أنماطها وامتداداتها في المياه الساحلية",
            "وجودها في قمم الجبال",
            "تكونها من الرمال الصحراوية",
            "ارتباطها بالفوهات البركانية فقط"
        ],

        englishOptions: [
            "Their patterns and extent in coastal waters",
            "Their presence on mountain peaks",
            "Their formation from desert sand",
            "Their exclusive association with volcanic craters"
        ],

        correct: 0,

        explanation: "تظهر الشعاب المرجانية بأشكال وامتدادات مميزة في المياه الساحلية، ويمكن رصدها بالصور الفضائية.",
        englishExplanation: "Coral reefs display distinctive shapes and patterns in coastal waters that can be observed in satellite imagery."
    }

];


// =================================
// 2. Quiz Variables
// =================================

let currentQuestion = 0;
let score = 0;
let answered = false;
let selectedAnswer = null;


// =================================
// 3. Display Question
// =================================

function displayQuestion() {

    const container = document.getElementById("quiz-container");

    if (!container) return;

    const isArabic = currentLanguage === "ar";
    const question = quizQuestions[currentQuestion];

    if (!question) {
        showQuizResult();
        return;
    }

    const options = isArabic
        ? question.options
        : question.englishOptions;

    const explanation = isArabic
        ? question.explanation
        : question.englishExplanation;

    container.innerHTML = `

        <div class="quiz-progress">
            ${isArabic
                ? `السؤال ${currentQuestion + 1} من ${quizQuestions.length}`
                : `QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}`}
        </div>

        <div class="quiz-progress-track">
            <div class="quiz-progress-fill"
                style="width: ${((currentQuestion + 1) / quizQuestions.length) * 100}%">
            </div>
        </div>

        <h3 class="quiz-question">
            ${isArabic ? question.question : question.englishQuestion}
        </h3>

        <div class="quiz-options">

            ${options.map((option, index) => {

                let optionClass = "quiz-option";

                if (answered) {
                    if (index === question.correct) {
                        optionClass += " correct";
                    } else if (index === selectedAnswer) {
                        optionClass += " wrong";
                    }
                }

                return `
                    <button
                        class="${optionClass}"
                        onclick="checkAnswer(${index})"
                        ${answered ? "disabled" : ""}>
                        ${option}
                    </button>
                `;

            }).join("")}

        </div>

        <div id="quiz-feedback"></div>

    `;

    // Restore feedback after changing language
    if (answered) {

        const feedback = document.getElementById("quiz-feedback");

        const isCorrect = selectedAnswer === question.correct;

        feedback.innerHTML = `

            <div class="feedback-message ${isCorrect ? "correct-message" : "wrong-message"}">

                <h4>
                    ${isCorrect
                        ? (isArabic ? "إجابة صحيحة! أحسنت 👏" : "Correct Answer! Well done 👏")
                        : (isArabic ? "إجابة غير صحيحة!" : "Incorrect Answer!")}
                </h4>

                <p>${explanation}</p>

            </div>

            <button class="quiz-next-button" onclick="nextQuestion()">
                ${currentQuestion === quizQuestions.length - 1
                    ? (isArabic ? "عرض النتيجة" : "View Results")
                    : (isArabic ? "السؤال التالي ←" : "Next Question →")}
            </button>

        `;

    }

}


// =================================
// 4. Check Answer
// =================================

function checkAnswer(selectedIndex) {

    if (answered) return;

    const question = quizQuestions[currentQuestion];

    if (!question) return;

    answered = true;
    selectedAnswer = selectedIndex;

    if (selectedIndex === question.correct) {
        score++;
    }

    displayQuestion();

}


// =================================
// 5. Next Question
// =================================

function nextQuestion() {

    currentQuestion++;

    answered = false;
    selectedAnswer = null;

    if (currentQuestion < quizQuestions.length) {
        displayQuestion();
    } else {
        showQuizResult();
    }

}


// =================================
// 6. Show Final Result
// =================================

function showQuizResult() {

    const container = document.getElementById("quiz-container");

    if (!container) return;

    const isArabic = currentLanguage === "ar";

    const percentage = Math.round(
        (score / quizQuestions.length) * 100
    );

    let message;

    if (percentage === 100) {

        message = isArabic
            ? "مذهل! لديك معرفة جغرافية رائعة 🌍"
            : "Amazing! You have excellent geographic knowledge 🌍";

    } else if (percentage >= 60) {

        message = isArabic
            ? "أحسنت! واصل استكشاف العالم 🗺️"
            : "Well done! Keep exploring the world 🗺️";

    } else {

        message = isArabic
            ? "رحلة التعلم مستمرة، حاول مرة أخرى!"
            : "Keep learning and try again!";

    }

    container.innerHTML = `

        <div class="quiz-result">

            <p class="eyebrow">
                QUIZ COMPLETED
            </p>

            <h2>
                ${isArabic
                    ? "انتهى التحدي الجغرافي!"
                    : "Geo Challenge Completed!"}
            </h2>

            <div class="quiz-score">
                ${score} / ${quizQuestions.length}
            </div>

            <p>
                ${isArabic
                    ? "نسبة إجاباتك الصحيحة:"
                    : "Your score:"}
                ${percentage}%
            </p>

            <p>${message}</p>

            <button class="quiz-next-button" onclick="restartQuiz()">
                ${isArabic ? "أعد المحاولة" : "Try Again"}
            </button>

        </div>

    `;

}


// =================================
// 7. Restart Quiz
// =================================

function restartQuiz() {

    currentQuestion = 0;
    score = 0;
    answered = false;
    selectedAnswer = null;

    displayQuestion();

}


// =================================
// 8. Initialize Quiz
// =================================

displayQuestion();