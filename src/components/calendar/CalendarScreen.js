import React, { useEffect, useState } from "react";
import Navbar from "../ui/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../helpers/calendar-messages";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  evenClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";

moment.locale("es");

const localizer = momentLocalizer(moment);

const CalendarScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const { event, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lasView, setLasView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      display: "block",
    };

    return {
      style,
    };
  };

  const dobleClick = () => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLasView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = () => {
    dispatch(evenClearActiveEvent());
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={event}
        onDoubleClickEvent={dobleClick}
        startAccessor="start"
        endAccessor="end"
        view={lasView}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      {activeEvent && <DeleteEventFab />}
      <CalendarModal />
    </div>
  );
};

export default CalendarScreen;
