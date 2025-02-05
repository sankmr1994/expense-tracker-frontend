import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { chartColors } from "../../utils/constants";

const PieChartUI = ({ data }) => {
  console.log("scscd", data);
  const sizing = {
    width: 400,
    height: 300,
    // legend: { hidden: true },
  };
  return (
    <PieChart
      colors={chartColors}
      series={[
        {
          arcLabel: (item) => `${item.percentage}%`,
          arcLabelMinAngle: 20,
          arcLabelRadius: "60%",
          data: [...data],
          innerRadius: 30,
          outerRadius: 120,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -45,
          cx: 150,
          cy: 150,
          highlightScope: { fade: "global", highlight: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontSize: 14,
        },
      }}
      slotProps={{
        legend: {
          itemMarkWidth: 10,
          itemMarkHeight: 3,
          markGap: 5,
          itemGap: 2,
          labelStyle: {
            fontSize: 12.5,
            fill: "black",
            fontWeight: "bold",
          },
        },
      }}
      {...sizing}
    />
  );
};

export default PieChartUI;
