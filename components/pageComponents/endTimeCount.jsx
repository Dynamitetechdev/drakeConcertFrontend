import ContractFunctions from "@/components/contractFunctions/contractFunctions";
import { useEffect, useState } from "react";

const Endtime = () => {
  const { endTime } = ContractFunctions();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let countInterval;

    const storedEndTime = localStorage.getItem("endtime");
    const parsedEndTime = parseInt(storedEndTime);

    if (!isNaN(parsedEndTime)) {
      countInterval = setInterval(() => {
        const currentDate = Math.floor(Date.now() / 1000);
        const remainingTime = parsedEndTime - currentDate;

        if (remainingTime <= 0) {
          clearInterval(countInterval);
          console.log("Timer Has Ended");
          return;
        }

        const days = Math.floor(remainingTime / (24 * 60 * 60));
        const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
        const seconds = remainingTime % 60;

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }, 1000);
    }

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  return (
    <div className="timer">
      <h1 className=" md:text-3xl font-bold">
        <span className="text-sm font-light ">Sale ExpiresIn: </span> <br />
        {days} <span className="text-sm font-light">days</span> : {hours}{" "}
        <span className="text-sm font-light">hours</span> : {minutes}{" "}
        <span className="text-sm font-light">minutes</span> : {seconds}
        <span className="text-sm font-light">seconds</span>
      </h1>
    </div>
  );
};

export default Endtime;
