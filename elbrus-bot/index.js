const buttons = document.querySelector(".buttons");
const chat = document.querySelector(".chat");
const answers = [
  "Bootcamp это интенсивный формат обучения с упором на практику.",
  "Elbrus Bootcamp появился в 2018 году благодаря Георгию Бабаяну, который в 2016 году прошел Dev Bootcamp в Сан-Франциско.",
  "Чтобы попасть в Elbrus нужно изучить основы JavaScript и пройти техническое интервью.",
  "На сайте Elbrus'а есть бесплатный тренажер для подготовки, а также каждую неделю проходят бесплатные мастер-классы.",
  "Программа обучения состоит из 4 фаз (этапов) и карьерной недели в конце.",
  "По окончании обучения ты получишь диплом о дополнительном профессиональном образовании, а также возможность работать в одной из самых актуальных сфер.",
];

buttons.addEventListener("click", () => {
  const target = document.querySelector(`.${event.target.className}`).innerText;
  const question = document.createElement("div");
  question.className = "question";
  const img = document.createElement("img");
  img.src = "./img/user.png";
  img.className = "userpic";
  img.alt = "";
  const qtext = document.createElement("div");
  qtext.className = "qtext";
  qtext.innerText = target;
  question.append(img, qtext);
  chat.append(question);
  chat.scrollTop = chat.scrollHeight;
  const answer = document.createElement("div");
  answer.className = "answer";
  const img2 = document.createElement("img");
  img2.src = "./img/bot.png";
  img2.className = "botpic";
  img2.alt = "";
  const atext = document.createElement("div");
  atext.className = "atext";
  const [format, estimation, getIn, preparation, program, result] = answers;
  if (event.target.className === "format") {
    atext.innerText = format;
  } else if (event.target.className === "estimation") {
    atext.innerText = estimation;
  } else if (event.target.className === "getIn") {
    atext.innerText = getIn;
  } else if (event.target.className === "preparation") {
    atext.innerText = preparation;
  } else if (event.target.className === "program") {
    atext.innerText = program;
  } else {
    atext.innerText = result;
  }
  answer.append(img2, atext);
  setTimeout(() => {
    chat.append(answer);
  }, 800);
  setTimeout(() => {
    chat.scrollTop = chat.scrollHeight;
  }, 810);
});
