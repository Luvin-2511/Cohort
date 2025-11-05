const center = document.querySelector(".center");
const main = document.querySelector("main");

const colors = [
  [106, 201, 147], 
  [236, 109, 138], 
  [255, 173, 116], 
  [162, 100, 213]  
];

center.addEventListener("scroll", () => {
  const scrollPos = center.scrollTop;
  const sectionHeight = center.clientHeight;
  const totalScroll = center.scrollHeight - sectionHeight;
  const progress = scrollPos / totalScroll; 

  const section = Math.min(Math.floor(progress * (colors.length - 1)), colors.length - 2);
  const sectionProgress = (progress * (colors.length - 1)) - section;

  const c1 = colors[section];
  const c2 = colors[section + 1];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * sectionProgress);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * sectionProgress);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * sectionProgress);

  main.style.transition = "background 0.5s linear";
  main.style.background = `radial-gradient(circle, rgb(${r},${g},${b}) 0%, black 100%)`;
});