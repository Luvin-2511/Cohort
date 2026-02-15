let h1 = document.querySelector(".text");
let texter = h1.innerText;
let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ";
console.log(texter);
let interval ;
let i = 0;
function randomText() {
  h1.innerHTML = texter
    .split("")
    .map((letter, idx) => {
      if (idx < i) {
        return letter;
      }
      let selector = Math.floor(Math.random() * 53);
      return alphabets.split("")[selector];
    })
    .join("");

  i += 0.5;
  if (i >= texter.length) {
    clearInterval(interval);
  }
}

h1.addEventListener("mouseenter", () => {
   interval = setInterval(() => {
    randomText();
  }, 30);
});

