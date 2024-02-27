import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../../theme";
import { useState } from "react";
import { Header } from "../../components";
import { formatDate } from "@fullcalendar/core";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMdDevices = useMediaQuery("(max-width:920px)");
  const isSmDevices = useMediaQuery("(max-width:600px)");
  const isXsDevices = useMediaQuery("(max-width:380px)");
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box display="flex" justifyContent="space-between" gap={2}>
        {/* CALENDAR SIDEBAR */}
        <Box
          display={`${isMdDevices ? "none" : "block"}`}
          flex="1 1 20%"
          bgcolor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  bgcolor: `${colors.greenAccent[500]}`,
                  my: "10px",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box
          flex="1 1 100%"
          sx={{
            "& .fc-list-day-cushion ": {
              bgcolor: `${colors.greenAccent[500]} !important`,
            },
          }}
        >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: `${isSmDevices ? "prev,next" : "prev,next today"}`,
              center: "title",
              right: `${
                isXsDevices
                  ? ""
                  : isSmDevices
                  ? "dayGridMonth,listMonth"
                  : "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
              }`,
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2024-02-27",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2024-02-29",
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
