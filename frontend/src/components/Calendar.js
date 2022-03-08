import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import abi from "../abis/Calend3.json";

import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import { Scheduler, WeekView, Appointments, AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

const schedulerData = [
    { startDate: '2022-03-08T09:45', endDate: '2022-03-08T11:00', title: 'Dogecoin Integration' },
    { startDate: '2022-03-09T12:00', endDate: '2022-03-09T13:30', title: 'Podcast appearance' },
  ];

const saveAppointment = (data) => {
    console.log('commiting changes');
    console.log(data);
}

const contractAddress = "0xdd17Bf4Da57EB0B102A7dAAc1c14395fA9b39413";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());  

const Calendar = () => {
    return (<div id="calendar">
      <Scheduler data={schedulerData}>
        <ViewState />
        <EditingState  onCommitChanges={saveAppointment}/>
        <IntegratedEditing />
        <WeekView startDayHour={9} endDayHour={18} excludedDays={[0, 6]}/>
        <Appointments />
        <AppointmentForm />
      </Scheduler>
    </div>);
}

export default Calendar;