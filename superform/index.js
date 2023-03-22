const name = document.querySelector("#name");
const secondName = document.querySelector("#secondName");
const email = document.querySelector("#email");
const age = document.querySelector("#age");
const country = document.querySelector("#country");
const btn = document.querySelector(".btn");
const users = document.querySelector(".users");
const clear = document.querySelector(".clear");

let clicked;
let outer;
let cardEmail;
let flag = false;

// Объект для localStorage, забирает информацию по ключу 'users'
const storage = JSON.parse(localStorage.getItem("users")) || {};

// Функция установки слушателей на HTML узлы
function setListeners() {
  const del = document.querySelectorAll(".delete");
  const change = document.querySelectorAll(".change");

  del.forEach((n) => {
    n.addEventListener("click", () => {
      clicked = n.getAttribute("data-delete");
      outer = document.querySelector(`[data-out="${clicked}"]`);
      const username = outer.parentElement;
      username.remove(users);
      const obj = JSON.parse(localStorage.getItem("users"));
      delete obj[clicked];
      clearLocalStorage();
      localStorage.setItem("users", JSON.stringify(obj));
    });
  });

  change.forEach((n) => {
    n.addEventListener("click", () => {
      clicked = n.getAttribute("data-change");
      outer = document.querySelector(`[data-out="${clicked}"]`);
      const cardValues = outer.children[0].childNodes;
      const [, fName, , sName, , mail, , years, , citizen] = cardValues;
      cardEmail = mail.innerText;
      name.value = fName.innerText;
      secondName.value = sName.innerText;
      email.value = mail.innerText;
      age.value = years.innerText;
      country.value = citizen.innerText;
      flag = true;
    });
  });
}

// Функция очистки хранилища localStorage по ключу `users`
function clearLocalStorage() {
  window.location.reload();
  localStorage.removeItem("users");
}

// Функция создания карточки
function createCard({ name, secondName, email, age, country }) {
  return `
    <div data-out=${email} class="user-outer">
        <div class="user-info">
            <p>${name}</p>
            <p>${secondName}</p>
            <p>${email}</p>
            <p>${age}</p>
            <p>${country}</p>
        </div>
        <div class="menu">
            <button data-delete=${email} class="delete">Удалить</button>
            <button data-change=${email} class="change">Применить</button>
        </div>
    </div>
  `;
}

// Функция обновления карточки
function rerenderCard(storage) {
  users.innerHTML = "";

  Object.entries(storage).forEach((user) => {
    // user = ['email1', {name: '', secondName: '', email: ''}]
    const [email, userData] = user;
    const div = document.createElement("div");
    div.className = "user";
    div.innerHTML = createCard(userData);
    users.append(div);
  });
}

// Функция получения данных из хранилища localStorage по ключу `users`
function getData(e) {
  e.preventDefault();
  const data = {};

  data.name = name.value || "";
  data.secondName = secondName.value || "";
  data.email = email.value || "";
  data.age = age.value || "";
  data.country = country.value || "";
  const key = data.email;
  storage[key] = data;

  localStorage.setItem("users", JSON.stringify(storage));

  rerenderCard(JSON.parse(localStorage.getItem("users")));

  return data;
}

// Экземпляр объекта, наблюдающий за DOM-элементом и запускающий колбэк в случае изменений
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length || mutation.removedNodes.length) {
      if (flag === true && cardEmail !== email.value) {
        const userCard = outer.parentElement;
        userCard.remove(users);
        const obj = JSON.parse(localStorage.getItem("users"));
        delete obj[clicked];
        clearLocalStorage();
        localStorage.setItem("users", JSON.stringify(obj));
        flag = false;
      }
      setListeners();
    }
  });
});

observer.observe(users, {
  childList: true,
});

btn.addEventListener("click", getData);
clear.addEventListener("click", clearLocalStorage);

// После перезагрузки страницы подтягиваем данные из localStorage
window.onload = rerenderCard(JSON.parse(localStorage.getItem("users")));
