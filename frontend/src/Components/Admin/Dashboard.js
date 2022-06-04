import React, { useEffect } from "react";
import Siderbar from "./Siderbar";
import "./Style/Dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminAnimals } from "../../Redux/actions/animalActions";
import { getAllUsers } from "../../Redux/actions/userActions";
import MetaData from "../../Metadata/Metadata";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { users, error } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    dispatch(getAdminAnimals());
    dispatch(getAllUsers());
  }, [dispatch, error]);

  const data = useSelector((state) => state.animals.adminAnimalsInfo);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [],
      },
    ],
  };

  const doughnutState = {
    labels: [
      "Buffalo",
      "Cow",
      "MaleBuffalo",
      "Ox",
      "Goat",
      "MaleGoat",
      "Sheep",
      "MaleSheep",
      "Camel",
      "CamelFemale",
      "Horse",
      "FemaleHorse",
    ],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Admins-Panel" />
      <Siderbar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div className="dashboardSummaryBox2">
            <Link to="/admin/dashboard/animalslist">
              <h5>Total Animals</h5>
              <div className="realTimeData">
                <p>{data && data.adminAnimalsCount}</p>
              </div>
            </Link>
            <Link to="/admin/dashboard/userslist">
              <h5>Total Users</h5>
              <div className="realTimeData">
                <p>{users && users.length}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="lineChart">{/* <Line data={lineState} /> */}</div>

        <div className="doughnutChart">
          {/* <Doughnut data={doughnutState} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
