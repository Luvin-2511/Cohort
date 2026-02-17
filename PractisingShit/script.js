let main = document.querySelector("main");

main.addEventListener("mousemove", (event) => {
  let color1 = Math.floor(Math.random() * 256);
  let color2 = Math.floor(Math.random() * 256);
  let color3 = Math.floor(Math.random() * 256);
  let x = event.clientX;
  let y = event.clientY;

  let newBox = document.createElement("div");
  newBox.classList.add("box");
  newBox.style.background = `linear-gradient(
    rgba(${color1},${color2},${color3},0.7),
    rgba(${color1},${color2},${color3},0.8)
  )`;
  newBox.style.left = x + "px";
  newBox.style.top = y + "px";
  main.appendChild(newBox);
  setTimeout(() => {
    newBox.remove();
  }, 500);
});
