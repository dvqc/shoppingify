import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import { PercentageBar } from "components/statistics";

const Statistics: NextPage = () => {
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  const data = {
    labels,

    datasets: [
      {
        label: "items",
        data: [52, 42, 30, 25, 29, 39, 58],
        borderColor: "#F9A109",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: "items2",
        data: [20, 21, 29, 49, 75, 82, 85],
        borderColor: "#F91509",
        backgroundColor: "rgba(0,0,0,0)"
      },
      {
        label: "items3",
        data: [95, 55, 23, 11, 7, 5, 6],
        borderColor: "#1509F9",
        backgroundColor: "rgba(0,0,0,0)"
      }
    ]
  };

  return (
    <>
      <div className="w-full my-10 grid grid-cols-2 gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-black text-2xl font-medium my-8 ">Top items</h2>
          <PercentageBar label="banana" percentage={58} />
          <PercentageBar label="cheese" percentage={25} />
          <PercentageBar label="lettuce" percentage={98} />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-black text-2xl font-medium my-8">Top categories</h2>
          <PercentageBar label="meat" percentage={44} />
          <PercentageBar label="eggs" percentage={12} />
          <PercentageBar label="milk" percentage={88} />
        </div>
      </div>
      <div className="w-full">
        <h2 className="text-black text-2xl font-medium mt-10 mb-8">Monthly summary</h2>
        <div className="relative w-full h-72">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
