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