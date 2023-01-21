import { NextPage } from "next";
import { Line } from "react-chartjs-2";
import { PercentageBar } from "components/statistics";
import { useCategoriesCounts, useListItemsCounts, useListItemsCountsByMonth } from "hooks/queries";
import { getPercentage } from "utils/helpers";
import { SkeletonLoader } from "components/loader";

const Statistics: NextPage = () => {
  const MONTHS_NUMBER = 6;
  const { data: monthlyCounts } = useListItemsCountsByMonth(MONTHS_NUMBER);
  const { data: itemsCounts } = useListItemsCounts();
  const { data: categoriesCounts } = useCategoriesCounts();

  const sumItemsCounts = itemsCounts?.map((item) => item.count).reduce((acc, curr) => acc + curr);
  const sumCategoriesCounts = categoriesCounts?.map((category) => category.count).reduce((acc, curr) => acc + curr);

  const labels: string[] = [];
  const monthlyCountsData: number[] = [];
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
      <div className="w-full my-10 grid md:grid-cols-2 md:gap-16 gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-black text-2xl font-medium my-8 ">Top items</h2>
          {itemsCounts && sumItemsCounts ? (
            <>
              {itemsCounts.map((itemCount, i) => {
                if (i < 3)
                  return (
                    <PercentageBar
                      key={itemCount.itemId}
                      label={itemCount.itemName}
                      percentage={getPercentage(itemCount.count, sumItemsCounts)}
                    />
                  );
              })}
            </>
          ) : (
            <>
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
            </>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-black text-2xl font-medium my-8">Top categories</h2>
          {categoriesCounts && sumCategoriesCounts ? (
            <>
              {categoriesCounts.map((categoryCount, i) => {
                if (i < 3)
                  return (
                    <PercentageBar
                      key={categoryCount.categoryId}
                      label={categoryCount.categoryName}
                      percentage={getPercentage(categoryCount.count, sumCategoriesCounts)}
                    />
                  );
              })}
            </>
          ) : (
            <>
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
              <SkeletonLoader className="w-full h-2 m-4 bg-slate-200" />
            </>
          )}
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
