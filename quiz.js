class Question {
  constructor(statement, correctAnswer) {
    this.statement = statement;
    this.correctAnswer = correctAnswer;
  }
}
const questions = [];
const qList = document.querySelector("#questions");
const scoreDisplay = document.querySelector("#score");
let score = 0;

async function startButtonClick() {
  score = 0;
  scoreDisplay.innerText = score;
  //questions.length = 0;
  const url = new URL(
    `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean`
  );

  const response = await fetch(url);
  if (response.status === 200) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    questions.splice(0, questions.length);

    for (const result of jsonResponse.results) {
      questions.push(new Question(result.question, result.correct_answer));
    }

    while (qList.childElementCount > 0) {
      qList.children[0].remove();
    }

    displayQuestions();
  }
}

function displayQuestions() {
  for (const question of questions) {
    //Skapa element
    const card = document.createElement("li");
    const cardHeader = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("h4");
    const cardFooter = document.createElement("div");
    const trueButton = document.createElement("button");
    const falseButton = document.createElement("button");

    //Styla element
    card.classList.add("card", "border-0", "mb-2");
    cardHeader.classList.add("card-header", "bg-info", "fw-bold");
    cardBody.classList.add("card-body", "bg-dark", "text-warning");
    cardText.classList.add("card-text");
    cardFooter.classList.add("card-footer", "bg-info");
    trueButton.classList.add(
      "btn",
      "mx-1",
      "btn-success",
      "border",
      "border-2",
      "border-dark"
    );
    falseButton.classList.add(
      "btn",
      "mx-1",
      "btn-danger",
      "border",
      "border-2",
      "border-dark"
    );

    //Innehåll i element
    cardHeader.innerText = questions.indexOf(question) + 1;
    cardText.innerText = question.statement;
    trueButton.innerText = "True";
    falseButton.innerText = "False";

    //Sätta upp event på element
    trueButton.onclick = () => {
      guessButtonClick(question, cardBody, falseButton, trueButton, "True");
    };

    falseButton.onclick = () => {
      guessButtonClick(question, cardBody, falseButton, trueButton, "False");
    };

    //Lägg till element i dom
    cardFooter.append(trueButton, falseButton);
    cardBody.append(cardText);
    card.append(cardHeader, cardBody, cardFooter);
    qList.append(card);
  }
}

function guessButtonClick(question, cardBody, falseButton, trueButton, guess) {
  if (question.correctAnswer === guess) {
    score++;
    scoreDisplay.innerText = score;
    cardBody.classList.remove("bg-dark", "text-warning");
    cardBody.classList.add("bg-success", "text-light");
  } else {
    cardBody.classList.remove("bg-dark", "text-warning");
    cardBody.classList.add("bg-danger", "text-light");
  }
  trueButton.disabled = true;
  falseButton.disabled = true;
}
