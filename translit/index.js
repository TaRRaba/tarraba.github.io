const leftColumn = document.querySelector(".leftColumn");
const rightColumn = document.querySelector(".rightColumn");
const button = document.querySelector(".inputButton");
const input = document.querySelector("input");
const eraseAll = document.querySelector(".eraseAll");
let c = 2; // counter

// Language check, if input contains EN letters, it will be set to empty
input.addEventListener("keypress", (e) => {
  const enLower = "abcdefghijklmnopqrstuvwxyz";
  const enUpper = enLower.toUpperCase();
  const en = enLower + enUpper;
  const getChar = (event) => String.fromCharCode(event.keyCode || event.charCode);
  const char = getChar(e);
  if (en.includes(char)) {
    setTimeout(() => {
      input.value = "";
    }, 500);
  }
});

// Translating from Russian to TRANSLIT
function translate(word) {
  let result = "";
  const dictionary = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "'",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "YO",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "'",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
  };

  for (i = 0; i < word.length; i++) {
    if (dictionary[word[i]] === undefined) {
      result += word[i];
    } else {
      result += dictionary[word[i]];
    }
  }
  return result;
}

// Adding rows to both dictionary box columns by adding long and short versions
// of the words with their pop-up titles and setting action EventListeners
function addRows(event) {
  if (input.value && !input.value[0].includes(" ")) {
    const rowLeftNext = document.createElement("div");
    const number = document.createElement("div");
    const rus = document.createElement("div");
    rowLeftNext.className = `rowLeftNext id${c}`;
    number.className = "number";
    rus.className = "rus";
    number.innerText = c;
    const rowRightNext = document.createElement("div");
    const translit = document.createElement("div");
    const svg = document.createElement("img");
    rowRightNext.className = `rowRightNext id${c}`;
    translit.className = "translit";
    svg.className = `svg ident${c}`;
    svg.src = "./icons/delete.svg";
    svg.alt = "";
    if (input.value.length > 7) {
      rus.innerText = `${input.value.slice(0, 7)}…`;
      translit.innerText = `${translate(input.value).slice(0, 7)}…`;
      const title = document.createElement("div");
      title.className = "title";
      title.innerText = input.value;
      const title2 = document.createElement("div");
      title2.className = "title2";
      title2.innerText = translate(input.value);
      rowLeftNext.append(title);
      rowRightNext.append(title2);
      rus.onmouseover = () => {
        title.style.display = "block";
      };
      rus.onmouseout = () => {
        title.style.display = "none";
      };
      translit.onmouseover = () => {
        title2.style.display = "block";
      };
      translit.onmouseout = () => {
        title2.style.display = "none";
      };
    } else {
      rus.innerText += input.value;
      translit.innerText += translate(input.value);
    }
    rowLeftNext.append(number, rus);
    leftColumn.append(rowLeftNext);
    rowRightNext.append(translit, svg);
    rightColumn.append(rowRightNext);
    input.value = "";
    input.focus();
    c++;
    svg.addEventListener("click", removeRows);
  }
}

// Removing rows one by one with correcting sequence numbers
function removeRows(event) {
  let target;
  if (Number(event.target.className.slice(-2)) >= 10) {
    target = event.target.className.slice(-2);
  } else {
    target = event.target.className.slice(-1);
  }
  const targets = document.querySelectorAll(`.id${target}`);
  targets[0].remove();
  targets[1].remove();
  c--;

  const numbers = document.querySelectorAll(".number");
  let y = target - 1;
  while (y < numbers.length) {
    numbers[y].innerText -= 1;
    const leftRows = document.querySelectorAll(".rowLeftNext");
    const rightRows = document.querySelectorAll(".rowRightNext");
    let classId;
    if (Number(leftRows[y - 1].className.slice(-2)) >= 10) {
      classId = Number(leftRows[y - 1].className.slice(-2)) - 1;
    } else {
      classId = Number(leftRows[y - 1].className.slice(-1)) - 1;
    }
    leftRows[y - 1].className = `rowLeftNext id${classId}`;
    rightRows[y - 1].className = `rowRightNext id${classId}`;
    const svgList = document.querySelectorAll(".svg");
    let svgId;
    if (Number(svgList[y - 1].className.slice(-2)) >= 10) {
      svgId = Number(svgList[y - 1].className.slice(-2)) - 1;
    } else {
      svgId = Number(svgList[y - 1].className.slice(-1)) - 1;
    }
    svgList[y - 1].className = `svg id${svgId}`;
    y++;
  }
  input.focus();
}

// Removing all rows by one click
function removeAllRows(event) {
  const leftAllRows = document.querySelectorAll(".rowLeftNext");
  const rightAllRows = document.querySelectorAll(".rowRightNext");
  let x = 0;
  while (x < leftAllRows.length) {
    leftAllRows[x].remove(leftColumn);
    rightAllRows[x].remove(rightColumn);
    x++;
  }
  c = 2;
  input.focus();
}

eraseAll.addEventListener("click", removeAllRows);
button.addEventListener("click", addRows);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addRows();
  }
});
