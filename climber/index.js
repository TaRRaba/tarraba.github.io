const img = document.querySelectorAll("img");
let i = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === "x" || event.key === "ч") {
    if (i < 6) {
      img[i].style = "display: none";
      img[i + 1].style = "display: block";
      i++;
    } else {
      img[i].style = "display: none";
      img[i + 1].style = "display: block";
      img[8].style = "display: block";
    }
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "z" || event.key === "я") {
    if (i === 6) {
      img[i + 1].style = "display: none";
      img[i].style = "display: block";
      img[8].style = "display: none";
      i--;
    } else if (i > 0) {
      img[i + 1].style = "display: none";
      img[i].style = "display: block";
      i--;
    } else {
      img[i + 1].style = "display: none";
      img[i].style = "display: block";
    }
  }
});
