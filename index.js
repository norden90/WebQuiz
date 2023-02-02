class Question {
  constructor(statement, correntAnswer) {
    this.statement = statement;
    this.correntAnswer = correntAnswer;
  }
}

const highscoreList = document.querySelector("#highscore-list");

const highscore = [];

const hightscoreJson = `
[
    {
        "name":"Andreas",
        "score": 5
    },
    {
        "name":"Ablin",
        "score": 0
    },
    {
        "name":"Lovisa",
        "score": 10
    }
]
`;

// hur man sorterar nummer
// const nums = [5, 200, 100000, 6, 54];
// console.log(nums.sort((c, p) => c - p));

populateHighscore();

function populateHighscore() {
  const scoreEnties = JSON.parse(hightscoreJson);

  scoreEnties.sort((c, p) => c.score - p.score).reverse();

  for (const entry of scoreEnties) {
    const li = document.createElement(`li`);
    li.classList.add("list-group-item", "bg-dark", "text-warning");
    li.innerText = `${entry.name} ${entry.score}`;
    highscoreList.append(li);
  }
}
