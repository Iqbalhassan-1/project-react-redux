import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { BASE_URL } from "../../../../config/Constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const StatePairAnalysis = () => {
  const [certChart, setCertChart] = useState([]);
  const [offsetChart, setOffsetChart] = useState([]);
  const [fuelChart, setFuelChart] = useState([]);
  const [flightChart, setFlightChart] = useState([]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Cert Chart",
      },
    },
  };

  const optionsOffset = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Subject Offset Chart",
      },
    },
  };

  const optionsFuel = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fuel Chart",
      },
    },
  };

  const optionsFlight = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Flight Chart",
      },
    },
  };

  const labelDataCertChart = [];
  const labelDataOffsetChart = [];
  const labelDataFuelChart = [];
  const labelDataFlightChart = [];

  certChart.forEach((item) => {
    labelDataCertChart.push(item.air_code);
  });

  offsetChart.forEach((item) => {
    labelDataOffsetChart.push(item.air_code);
  });

  fuelChart.forEach((item) => {
    labelDataFuelChart.push(item.air_code);
  });

  flightChart.forEach((item) => {
    labelDataFlightChart.push(item.air_code);
  });

  const certYes = certChart
    .filter((item) => {
      return item.cert === "yes";
    })
    .map((item) => parseInt(item.co_emission));

  const certNo = certChart
    .filter((item) => {
      return item.cert === "no";
    })
    .map((item) => parseInt(item.co_emission));

  const offsetYes = offsetChart
    .filter((item) => {
      return item.subject_offset === "Yes";
    })
    .map((item) => parseInt(item.co_emission));

  const offsetNo = offsetChart
    .filter((item) => {
      return item.subject_offset === null;
    })
    .map((item) => parseInt(item.co_emission));

  const totalNoFuel = fuelChart.map((item) => item.total_no);
  const totalNoFlight = flightChart.map((item) => item.total_no);

  const certData = {
    labels: labelDataCertChart,
    datasets: [
      {
        label: "Yes",
        data: certYes,
        backgroundColor: "#00A8E0",
      },
      {
        label: "No",
        data: certNo,
        backgroundColor: "#E88224",
      },
    ],
  };

  const offsetData = {
    labels: labelDataOffsetChart,
    datasets: [
      {
        label: "Yes",
        data: offsetYes,
        backgroundColor: "#00A8E0",
      },
      {
        label: "No",
        data: offsetNo,
        backgroundColor: "#E88224",
      },
    ],
  };

  const fuelData = {
    labels: labelDataOffsetChart,
    datasets: [
      {
        label: "Total No",
        data: totalNoFuel,
        backgroundColor: "#00A8E0",
      },
    ],
  };

  const flightData = {
    labels: labelDataFlightChart,
    datasets: [
      {
        label: "Total No",
        data: totalNoFlight,
        backgroundColor: "#00A8E0",
      },
    ],
  };
  useEffect(() => {
    const certChart = async () => {
      try {
        let jwtToken = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(BASE_URL + "api/sa/certChart", {
          headers,
        });
        setCertChart(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    certChart();

    const offsetChart = async () => {
      try {
        let jwtToken = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(BASE_URL + "api/sa/offsetChart", {
          headers,
        });
        setOffsetChart(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    offsetChart();

    const totalFuelChart = async () => {
      try {
        let jwtToken = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(BASE_URL + "api/sa/totalFuelChart", {
          headers,
        });
        setFuelChart(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    totalFuelChart();

    const totalFlightChart = async () => {
      try {
        let jwtToken = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await axios.get(
          BASE_URL + "api/sa/totalFlightsChart",
          {
            headers,
          }
        );
        setFlightChart(response.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    totalFlightChart();
  }, []);
  return (
    <>
      <div className="main-class">
        <Bar options={options} data={certData} />
        <Bar options={optionsOffset} data={offsetData} />
        <Bar options={optionsFuel} data={fuelData} />
        <Bar options={optionsFlight} data={flightData} />
      </div>
    </>
  );
};

export default StatePairAnalysis;
