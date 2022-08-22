import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { percentage } from "../../utils/format-number";

export const TrafficAmount = (props) => {
  const theme = useTheme();

  const {
    data: { totalSellAmount, totalBuyAmount, totalCancelAmount },
  } = props;
  const totalRemainSellAmount =
    Number(totalSellAmount) - Number(totalBuyAmount) - Number(totalCancelAmount);

  console.log({
    data: [
      Math.round(percentage(totalRemainSellAmount, totalSellAmount)),
      Math.round(percentage(totalBuyAmount, totalSellAmount)),
      Math.round(percentage(totalCancelAmount, totalSellAmount)),
    ],
  });
  const data = {
    datasets: [
      {
        data: [
          Math.round(percentage(totalRemainSellAmount, totalSellAmount)),
          Math.round(percentage(totalBuyAmount, totalSellAmount)),
          Math.round(percentage(totalCancelAmount, totalSellAmount)),
        ],
        backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Sell", "Buy", "Cancel"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const devices = [
    {
      title: "Sell",
      value: Math.round(percentage(totalRemainSellAmount, totalSellAmount)),
      icon: LaptopMacIcon,
      color: "#3F51B5",
    },
    {
      title: "Buy",
      value: Math.round(percentage(totalBuyAmount, totalSellAmount)),
      icon: TabletIcon,
      color: "#E53935",
    },
    {
      title: "Cancel",
      value: Math.round(percentage(totalCancelAmount, totalSellAmount)),
      icon: PhoneIcon,
      color: "#FB8C00",
    },
  ];

  return (
    <Card {...props}>
      <CardHeader title="Traffic by Transaction" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
