const Card = ({
  text = "Sale",
  sideText = "Buy this at 50%",
  position,
  rotation,
}) => {
  return (
    <div
      style={{
        left: position.x,
        top: position.y,
        "--rx": `${rotation.x}deg`,
        "--ry": `${rotation.y}deg`,
        "--rz": `${rotation.z}deg`,
        transition: "all 0.5s ease",
      }}
      className="card-wrapper"
    >
      <div className="dot"></div>
      <div className="text">
        <h2>{text}</h2>
        <h5>{sideText}</h5>
      </div>
    </div>
  );
};

export default Card;
