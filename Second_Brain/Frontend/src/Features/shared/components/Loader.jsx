import { useEffect, useState } from "react";
import "../styles/Loader.css";

const Box = ({ id }) => {
  return (
    <>
      <div
        style={{
          "--sequence": id,
        }}
        className="box"
      ></div>
    </>
  );
};

const Loader = () => {
  const noOfBoxedInRows = 15;
  const noOfBoxedInColumns = 25;
  const totalBoxes = noOfBoxedInRows * noOfBoxedInColumns;
  const BoxArray = Array.from({ length: totalBoxes });
  const [timer, setTimer] = useState(0);
  const [loadingCompleted,setLoadingCompleted] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if(timer>=100){
        setTimer(Math.min(timer,100))
        setLoadingCompleted(true);
        clearInterval(timerInterval)
        return 
      }
        {
          timer < 60 ?
            setTimer(prev=>prev+2) 
          : 
            setTimer(prev=>prev+8)
          ;
        }
    }, 100);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  return (
    <>
      <div
        style={{
          "--row": noOfBoxedInRows,
          "--col": noOfBoxedInColumns,
        }}
        className="loader-page"
      >
        {BoxArray.map((_, id) => {
          return <Box key={id} id={id} />;
        })}
      </div>
      <div style={{
        animation:loadingCompleted?"timerAnimation 0.3s linear":""
      }} className="loader-timer">{timer}</div>
      <div className="loader-timer-behind">{timer}</div>
    </>
  );
};

export default Loader;
