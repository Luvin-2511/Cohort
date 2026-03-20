export const toggleTheme = (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const root = document.documentElement;
  root.style.setProperty("--x", `${x}px`);
  root.style.setProperty("--y", `${y}px`);

  document.startViewTransition(() => {
    root.classList.toggle("light-theme");
  });
};
