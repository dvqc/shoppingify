import { NextPage } from "next";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Line } from "react-chartjs-2";
import { PercentageBar } from "components/statistics";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Statistics: NextPage = () => {
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  const data = {
    labels,

    datasets: [
      {
        label: "Dataset 1",
        data: [52, 42, 30, 25, 29, 39, 58],
        borderColor: "#F9A109",
        backgroundColor: "#F9A109"
      }
    ]
  };

  return (
    <>
      <div className="w-full my-10 grid grid-cols-2 gap-16">
        <div>
          <h2 className="text-black text-2xl font-medium my-8">Top items</h2>
          <PercentageBar label="banana" percentage={58} />
          <PercentageBar label="cheese" percentage={25} />
          <PercentageBar label="lettuce" percentage={98} />
        </div>
        <div>
          <h2 className="text-black text-2xl font-medium my-8">Top categories</h2>
          <PercentageBar label="meat" percentage={44} />
          <PercentageBar label="eggs" percentage={12} />
          <PercentageBar label="milk" percentage={88} />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-black text-2xl font-medium mt-10 mb-8">Monthly summary</h2>
        <div className="relative w-full h-80">
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
