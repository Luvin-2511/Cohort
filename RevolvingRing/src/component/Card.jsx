const Card = ({ no , title, description }) => {
  return (
    <div className="card-wrapper">
      <h5 className="card-index">0{no+1}</h5>
      <h2 className="card-title">{title}</h2>
      <div className="line"></div>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
