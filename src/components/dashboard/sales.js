import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "@apollo/client";
import moment from "moment";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { GET_TRANSACTION_COUNTERS_DATE } from "../../apis/queries";
import { diffTime } from "../../utils/format-number";
import { FILTER_TIME_LATEST_SALE } from "../../constants";

export const Sales = (props) => {
  const theme = useTheme();
  const [startTime, setStartTime] = useState(
    Math.round(moment().subtract(7, "days").valueOf() / 1000)
  );
  const [endTime, setEndTime] = useState(Math.round(moment().valueOf() / 1000));
  const [dataChart, setDataChart] = useState([
    {
      backgroundColor: "#3F51B5",
      barPercentage: 0.5,
      barThickness: 12,
      borderRadius: 4,
      categoryPercentage: 0.5,
      data: [18, 5, 19, 27, 29, 19, 20],
      label: "",
      maxBarThickness: 10,
    },
  ]);
  const [labelsChart, setLabelsChart] = useState([]);
  const [filterTime, setFilterTime] = useState("");

  const {
    data: dataTransactions,
    loading,
    error,
    refetch,
  } = useQuery(GET_TRANSACTION_COUNTERS_DATE, {
    variables: {
      orderBy: "date",
      orderDirection: "desc",
      startTime: startTime,
      endTime: endTime,
    },
  });

  useEffect(() => {
    if (dataTransactions) {
      const days = diffTime(startTime * 1000, endTime * 1000, "days");

      const dataCategories = dataTransactions.transactionCounterDays.reduce((acc, ele) => {
        const { date } = ele;
        const day = moment(date * 1000).format("DD/MM/YYYY");
        acc[day] = ele;

        return acc;
      }, {});

      const results = {};
      for (let index = 0; index < days; index++) {
        const date = moment(startTime * 1000)
          .add(index, "days")
          .format("DD/MM/YYYY");
        results[date] = 0;
        if (dataCategories[date]) {
          results[date] = ~~dataCategories[date].totalSellAmount;
        }
      }

      setLabelsChart(Object.keys(results));
      setDataChart([
        {
          backgroundColor: "#3F51B5",
          barPercentage: 0.5,
          barThickness: 12,
          borderRadius: 4,
          categoryPercentage: 0.5,
          data: Object.values(results),
          label: "Total Buy Amount",
          maxBarThickness: 10,
        },
      ]);
    }
  }, [dataTransactions, startTime, endTime]);

  const handleChangeTime = (event) => {
    const option = event.target.value;
    let end = moment().valueOf();
    let start = moment().subtract(7, "days").valueOf();

    switch (option) {
      case FILTER_TIME_LATEST_SALE.WEEK:
        start = moment().subtract(7, "days").valueOf();
        break;
      case FILTER_TIME_LATEST_SALE.MONTH:
        start = moment().subtract(30, "days").valueOf();
        break;
      case FILTER_TIME_LATEST_SALE.QUARTER:
        start = moment().subtract(90, "days").valueOf();
        break;
      default:
        break;
    }

    setFilterTime(option);
    setStartTime(Math.round(start / 1000));
    setEndTime(Math.round(end / 1000));

    refetch({
      orderBy: "date",
      orderDirection: "desc",
      startTime: Math.round(start / 1000),
      endTime: Math.round(end / 1000),
    });
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return null;
  }

  const data = {
    datasets: [
      {
        backgroundColor: "#3F51B5",
        barPercentage: 0.5,
        barThickness: 12,
        borderRadius: 4,
        categoryPercentage: 0.5,
        data: [18, 5, 19, 27, 29, 19, 20],
        label: "",
        maxBarThickness: 10,
      },
      // {
      //   backgroundColor: "#EEEEEE",
      //   barPercentage: 0.5,
      //   barThickness: 12,
      //   borderRadius: 4,
      //   categoryPercentage: 0.5,
      //   data: [11, 20, 12, 29, 30, 25, 13],
      //   label: "Last year",
      //   maxBarThickness: 10,
      // },
    ],
    labels: ["1 Aug", "2 Aug", "3 Aug", "4 Aug", "5 Aug", "6 Aug", "7 aug"],
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
        },
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0,
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider,
        },
      },
    ],
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

  return (
    <Card {...props}>
      <CardHeader
        action={
          <>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="demo-simple-select-helper"
                onChange={handleChangeTime}
                value={filterTime}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={FILTER_TIME_LATEST_SALE.WEEK}>7 days</MenuItem>
                <MenuItem value={FILTER_TIME_LATEST_SALE.MONTH}>30 days</MenuItem>
                <MenuItem value={FILTER_TIME_LATEST_SALE.QUARTER}>3 months</MenuItem>
              </Select>
            </FormControl>
          </>
        }
        title="Latest Sales"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: "relative",
          }}
        >
          <Line data={{ datasets: dataChart, labels: labelsChart }} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
          Overview
        </Button>
      </Box>
    </Card>
  );
};
