import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../abis/Calend3.json";

import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
} from "@devexpress/dx-react-scheduler-material-ui";

import { Box, Button, Slider } from "@material-ui/core";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";

import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

// const schedulerData = [
//   {
//     startDate: "2022-03-08T09:45",
//     endDate: "2022-03-08T11:00",
//     title: "Dogecoin Integration",
//   },
//   {
//     startDate: "2022-03-09T12:00",
//     endDate: "2022-03-09T13:30",
//     title: "Podcast appearance",
//   },
// ];

const contractAddress = "0x3cA4a6C947A27d67BdD495EECF214C006fd82fE3";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider.getSigner()
);

const Calendar = (props) => {
  //States for admin and rate
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [rate, setRate] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [showSign, setShowSign] = useState(false);
  const [mined, setMined] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const getData = async () => {
    const owner = await contract.owner();
    console.log(owner);

    setIsAdmin(owner.toUpperCase() === props.account.toUpperCase());

    const rate = await contract.getRate();
    console.log(rate.toString());
    setRate(ethers.utils.formatEther(rate.toString()));

    const appointmentsData = await contract.getAppointments();
    console.log("got appointments");
    console.log(appointmentsData);
    transformAppointData(appointmentsData);
  };

  const transformAppointData = (appointmentsData) => {
    let data = [];
    appointmentsData.forEach((appointment) => {
      data.push({
        title: appointment.title,
        startDate: new Date(appointment.startTime * 1000),
        endDate: new Date(appointment.endTime * 1000),
      });
    });
    setAppointments(data);
  };

  //Tells React that your component needs to do something after render
  useEffect(() => {
    getData();
  }, []);

  //Event Listener for sliderchange
  const handleSliderChange = (event, newValue) => {
    setRate(newValue);
  };

  //Saves rate to the blokchain
  const saveRate = async () => {
    const tx = await contract.setRate(ethers.utils.parseEther(rate.toString()));
  };

  const marks = [
    {
      value: 0.0,
      label: "Free",
    },
    {
      value: 0.02,
      label: "0.02 ETH/min",
    },
    {
      value: 0.04,
      label: "0.04 ETH/min",
    },
    {
      value: 0.06,
      label: "0.06 ETH/min",
    },
    {
      value: 0.08,
      label: "0.08 ETH/min",
    },
    {
      value: 0.1,
      label: "Expensive",
    },
  ];

  const saveAppointment = async (data) => {
    console.log("commiting changes");
    console.log(data);

    const appointment = data.added;
    const title = appointment.title;
    const startTime = appointment.startDate.getTime() / 1000; //converts to Unix timestamp
    const endTime = appointment.endDate.getTime() / 1000;

    setShowSign(true);
    setShowDialog(true);
    setMined(false);

    try {
      const cost = (((endTime - startTime) / 60) * (rate * 100)) / 100; //get away with floating number error
      const msg = { value: ethers.utils.parseEther(cost.toString()) };
      let transaction = await contract.createAppointments(
        title,
        startTime,
        endTime,
        msg
      );

      setShowSign(false);

      await transaction.wait();
      setMined(true);
      setTransactionHash(transaction.hash);
    } catch (error) {
      console.log(error);
    }
  };

  const Admin = () => {
    return (
      <div id="admin">
        <Box>
          <h3>Set Your Minutely Rate</h3>
          <Slider
            defaultValue={parseFloat(rate)}
            step={0.001}
            min={0}
            max={0.1}
            marks={marks}
            valueLabelDisplay="auto"
            onChangeCommitted={handleSliderChange}
          />
          <br />
          <br />
          <Button id={"settings-button"} onClick={saveRate} variant="contained">
            <SettingsSuggestIcon /> save configuration
          </Button>
        </Box>
      </div>
    );
  };

  const ConfirmDialog = () => {
    return (
      <Dialog open={true}>
        <h3>
          {mined && "Appointment Confirmed"}
          {!mined && !showSign && "Confirming Your Appointment..."}
          {!mined && showSign && "Please Sign to Confirm"}
        </h3>
        <div style={{ textAlign: "left", padding: "0px 20px 20px 20px" }}>
          {mined && (
            <div>
              Your appointment has been confirmed and is on the blockchain.
              <br />
              <br />
              <a
                target="_blank"
                href={`https://goerli.etherscan.io/tx/${transactionHash}`}
              >
                View on Etherscan
              </a>
            </div>
          )}
          {!mined && !showSign && (
            <div>
              <p>
                Please wait while we confirm your appoinment on the
                blockchain....
              </p>
            </div>
          )}
          {!mined && showSign && (
            <div>
              <p>Please sign the transaction to confirm your appointment.</p>
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", paddingBottom: "30px" }}>
          {!mined && <CircularProgress />}
        </div>
        {mined && (
          <Button
            onClick={() => {
              setShowDialog(false);
              getData();
            }}
          >
            Close
          </Button>
        )}
      </Dialog>
    );
  };

  return (
    <div>
      <div>
        {isAdmin && (
          <Button
            onClick={() => setShowAdmin(!showAdmin)}
            variant="contained"
            startIcon={<SettingsSuggestIcon />}
          >
            Admin
          </Button>
        )}
      </div>
      {isAdmin && <Admin />}
      <div id="calendar">
        <Scheduler data={appointments}>
          <ViewState />
          <EditingState onCommitChanges={saveAppointment} />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={18} excludedDays={[0, 6]} />
          <Appointments />
          <AppointmentForm />
        </Scheduler>
      </div>

      {showDialog && <ConfirmDialog />}
    </div>
  );
};

export default Calendar;
