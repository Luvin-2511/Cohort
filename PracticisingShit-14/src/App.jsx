import { useEffect, useState } from "react";

const App = () => {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    document.documentElement.setAttribute("theme", theme);
  }, [theme]);
  return (
    <main>
      <div
        onClick={() => {
          document.startViewTransition(() => {
            setTheme((prev) => {
              if (prev === "dark") return "light";
              else return "dark";
            });
          });
        }}
        className="changer"
      >
        {theme == "dark" ? "Light" : "Dark"}
      </div>
    </main>
  );
};

export default App;
