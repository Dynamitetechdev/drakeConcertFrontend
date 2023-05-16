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

        const days = Math.floor(remainingTime / (24 * 60 * t60));
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
      <h1>
        End Time:
        {`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}
      </h1>
    </div>
  );
};

export default Endtime;
