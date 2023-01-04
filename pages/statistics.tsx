import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import { PercentageBar } from "components/statistics";
import { useListItemsCounts, useListItemsCountsByMonth } from "hooks/queries";

const Statistics: NextPage = () => {
  const MONTHS_NUMBER = 6;
  const { data: monthlyCounts } = useListItemsCountsByMonth(MONTHS_NUMBER);
  const { data: itemsCounts } = useListItemsCounts();

  let labels: string[] = [];
  let monthlyCountsData: number[] = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (monthlyCounts) {
    const oldestMonth = new Date(new Date().setMonth(new Date().getMonth() - MONTHS_NUMBER)).getMonth();

    for (let i = 0; i < MONTHS_NUMBER; i++) {
      const month = (oldestMonth + i + 1) % 12;
      labels.push(months[month]);
      monthlyCountsData.push(0);

      monthlyCounts.forEach((element) => {
        if (element.month == month) monthlyCountsData[i] = element.count;
      });
    }
  }
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
        data: monthlyCountsData,
        borderColor: "#F9A109",
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
