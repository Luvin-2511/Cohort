let svg = document.querySelector(".string svg");
let line = document.querySelector(".string svg path");
let light1 = document.querySelector(".bg-light");
let light2 = document.querySelector(".round-light");
let form = document.querySelector(".form-container");
let lampTop = document.querySelector('.lamp .top')

let dragged = false;
let lampOn = false;

svg.addEventListener("mousedown", () => {
  dragged = true;
});

svg.addEventListener("mousemove", (e) => {
  if (dragged == true) {
    const leftSpace = svg.getBoundingClientRect();
    const x = e.clientX - leftSpace.left;
    const y = e.clientY - leftSpace.top;
    gsap.to(line, {
      attr: {
        d: `M 30 80 Q ${x} ${y} 100 80`,
      },
      ease: "elastic",
    });
  }
});

window.addEventListener("mouseup", () => {
  if (dragged) {
    lampOn = !lampOn;
    if (lampOn == true) {
      light1.style.opacity = 1;
      light2.style.opacity = 1;
      form.style.opacity = 1
    } else if (lampOn == false) {
      light1.style.opacity = 0;
      light2.style.opacity = 0;
      form.style.opacity = 0
    }
    dragged = false;
    gsap.to(line, {
      attr: {
        d: `M 10 80 Q 50 80 160 80`,
      },
      ease: "elastic",
    });
  }
});
