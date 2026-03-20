import { toggleTheme } from "../toggle";

const Home = () => {
    const text = "This is Just for practising smooth theme transition"
  return (
    <div
      onClick={(e) => {
        toggleTheme(e);
      }}
      className="page-wrapper"
    >
      <h1 className="hero-text">
      </h1>
      <div className="button-toggle">CLICK ANYWHERE TO TOGGLE THEME</div>
    </div>
  );
};

export default Home;
