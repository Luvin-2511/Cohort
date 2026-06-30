import { useState } from "react";
import Card from "./Card";

const App = () => {
  const [cards, setCards] = useState([]);
  async function handleClick(e) {
    const id = crypto.randomUUID();
    setCards([
      ...cards,
      {
        id,
        position: {
          x: e.clientX,
          y: e.clientY,
        },
        rotation: {
          x: Math.random() * 720 * (Math.random() < 0.5 ? -1 : 1),
          y: Math.random() * 320 * (Math.random() < 0.5 ? -1 : 1),
          z: Math.random() * 720 * (Math.random() < 0.5 ? -1 : 1),
        },
      },
    ]);
    setTimeout(() => {
      setCards((prev) => prev.filter((card) => card.id !== id));
    }, 2000);
  }
  return (
    <main
      onClick={(e) => {
        handleClick(e);
      }}
    >
      {cards.map((card) => {
        return <Card position={card.position} rotation={card.rotation} />;
      })}
    </main>
  );
};

export default App;
