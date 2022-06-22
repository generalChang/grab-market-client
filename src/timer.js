import React, { useEffect } from "react";

function TimerComponent() {
  const [time, setTime] = React.useState(0);
  console.log("컴포넌트 랜더링");

  useEffect(() => {
    setTime(time + 1);
  }, []);
  return (
    <div>
      <h3>{time}</h3>
      <button>1씩 올려주세요</button>
    </div>
  );
}

export default TimerComponent;
