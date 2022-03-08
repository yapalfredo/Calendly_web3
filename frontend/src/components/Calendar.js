import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import abi from "../abis/Calend3.json";

import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

import { Box, Button, Slider } from '@material-ui/core';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const schedulerData = [
    { startDate: '2022-03-08T09:45', endDate: '2022-03-08T11:00', title: 'Dogecoin Integration' },
    { startDate: '2022-03-09T12:00', endDate: '2022-03-09T13:30', title: 'Podcast appearance' },
  ];

const saveAppointment = (data) => {
    console.log('commiting changes');
    console.log(data);
}

const contractAddress = "0x3cA4a6C947A27d67BdD495EECF214C006fd82fE3";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());  

const Calendar = (props) => {

    //States for admin and rate
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false);
    const [rate, setRate] = useState(false);

    const getData = async () => {
      const owner = await contract.owner();
      console.log(owner);

      setIsAdmin(owner.toUpperCase() === props.account.toUpperCase());

      const rate = await contract.getRate();
      console.log(rate.toString());
      setRate(rate.toString());
    }

    useEffect(() => {
      getData();
    }, []);

    return (
    <div>
      {isAdmin && <div id="admin">
        is admin
      </div>}
      <div id="calendar">
        <Scheduler data={schedulerData}>
          <ViewState />
          <EditingState  onCommitChanges={saveAppointment}/>
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={18} excludedDays={[0, 6]}/>
          <Appointments />
          <AppointmentForm />
        </Scheduler>
      </div>
    </div>
    );
}

export default Calendar;