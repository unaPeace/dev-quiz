const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let randomQuestions = []; // Array to store randomly selected questions

start_btn.onclick = () => {
  info_box.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
};

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  selectRandomQuestions(); // Select random questions
  que_count = 0; // Reset question count
  que_numb = 1; // Reset question number
  userScore = 0; // Reset user score
  widthValue = 0; // Reset width value
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  selectRandomQuestions(); // Select random questions
  que_count = 0; // Reset question count
  que_numb = 1; // Reset question number
  userScore = 0; // Reset user score
  widthValue = 0; // Reset width value
  showQuestions(0);
  queCounter(1);
  clearInterval(counter);
  clearInterval(counterLine);
  startTimer(timeValue);
  startTimerLine(widthValue);
  timeText.textContent = "Time Left";
  next_btn.classList.remove("show");
};

quit_quiz.onclick = () => {
  window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  if (que_count < randomQuestions.length - 1) {
    que_count++;
    que_numb++;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
  }
};

function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
  
    let que_tag =
      "<span>" +
      randomQuestions[index].numb +
      ". " +
      randomQuestions[index].question +
      "</span>";
  
    // Shuffle the options array to randomize their positions
    let options = randomQuestions[index].options.sort(() => Math.random() - 0.5);
  
    let option_tag =
      '<div class="option"><span>' +
      options[0] +
      "</span></div>" +
      '<div class="option"><span>' +
      options[1] +
      "</span></div>" +
      '<div class="option"><span>' +
      options[2] +
      "</span></div>" +
      '<div class="option"><span>' +
      options[3] +
      "</span></div>";
  
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
  
    const option = option_list.querySelectorAll(".option");
  
    for (let i = 0; i < option.length; i++) {
      option[i].setAttribute("onclick", "optionSelected(this)");
    }
  }

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = randomQuestions[que_count].answer;
  const allOptions = option_list.children.length;

  if (userAns === correctAns) {
    userScore += 1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIconTag);
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag);
    console.log("Wrong Answer");

    for (let i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent === correctAns) {
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (let i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.classList.add("show");
}

function showResult() {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      randomQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else if (userScore > 1) {
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      randomQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      randomQuestions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 10) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      const allOptions = option_list.children.length;
      let correctAns = randomQuestions[que_count].answer;
      for (let i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent === correctAns) {
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.classList.add("show");
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    time_line.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}

function queCounter(index) {
  let totalQueCountTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    randomQuestions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCountTag;
}

function selectRandomQuestions() {
  // Reset randomQuestions array
  randomQuestions = [];

  // Generate 5 unique random indices
  let indices = [];
  while (indices.length < 5) {
    let randomIndex = Math.floor(Math.random() * questions.length);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }

  // Push randomly selected questions to randomQuestions array
  indices.forEach((index) => {
    randomQuestions.push(questions[index]);
  });
}
