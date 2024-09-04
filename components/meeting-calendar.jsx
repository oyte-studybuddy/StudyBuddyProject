"use client";
import React, { useCallback, useState, useMemo, Fragment } from "react";
import PropTypes from "prop-types";
import BigCA, {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer,
} from "react-big-calendar";
// import DemoLink from '../../DemoLink.component'
// import events from '../../resources/events'
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "./ui/button";
const now = new Date();

export const events = [
  /* {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  }, */
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  // {
  //   id: 2,
  //   title: 'DTS STARTS',
  //   start: new Date(2016, 2, 13, 0, 0, 0),
  //   end: new Date(2016, 2, 20, 0, 0, 0),
  // },

  // {
  //   id: 3,
  //   title: 'DTS ENDS',
  //   start: new Date(2016, 10, 6, 0, 0, 0),
  //   end: new Date(2016, 10, 13, 0, 0, 0),
  // },

  // {
  //   id: 4,
  //   title: 'Some Event',
  //   start: new Date(2015, 3, 9, 0, 0, 0),
  //   end: new Date(2015, 3, 9, 0, 0, 0),
  //   allDay: true,
  // },

  // {
  //   id: 92,
  //   title: 'Some Other Event',
  //   start: new Date(2015, 3, 9, 8, 0, 0),
  //   end: new Date(2015, 3, 10, 11, 30, 0),
  // },
  // {
  //   id: 5,
  //   title: 'Conference',
  //   start: new Date(2015, 3, 11),
  //   end: new Date(2015, 3, 13),
  //   desc: 'Big conference for important people',
  // },
  // {
  //   id: 6,
  //   title: 'Meeting',
  //   start: new Date(2015, 3, 12, 10, 30, 0, 0),
  //   end: new Date(2015, 3, 12, 12, 30, 0, 0),
  //   desc: 'Pre-meeting meeting, to prepare for the meeting',
  // },
  // {
  //   id: 7,
  //   title: 'Lunch',
  //   start: new Date(2015, 3, 12, 12, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 13, 0, 0, 0),
  //   desc: 'Power lunch',
  // },
  // {
  //   id: 8,
  //   title: 'Meeting',
  //   start: new Date(2015, 3, 12, 14, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 15, 0, 0, 0),
  // },
  // {
  //   id: 9,
  //   title: 'Happy Hour',
  //   start: new Date(2015, 3, 12, 17, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 17, 30, 0, 0),
  //   desc: 'Most important meal of the day',
  // },
  // {
  //   id: 10,
  //   title: 'Dinner',
  //   start: new Date(2015, 3, 12, 20, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 21, 0, 0, 0),
  // },
  // {
  //   id: 11,
  //   title: 'Planning Meeting with Paige',
  //   start: new Date(2015, 3, 13, 8, 0, 0),
  //   end: new Date(2015, 3, 13, 10, 30, 0),
  // },
  // {
  //   id: 11.1,
  //   title: 'Inconvenient Conference Call',
  //   start: new Date(2015, 3, 13, 9, 30, 0),
  //   end: new Date(2015, 3, 13, 12, 0, 0),
  // },
  // {
  //   id: 11.2,
  //   title: "Project Kickoff - Lou's Shoes",
  //   start: new Date(2015, 3, 13, 11, 30, 0),
  //   end: new Date(2015, 3, 13, 14, 0, 0),
  // },
  // {
  //   id: 11.3,
  //   title: 'Quote Follow-up - Tea by Tina',
  //   start: new Date(2015, 3, 13, 15, 30, 0),
  //   end: new Date(2015, 3, 13, 16, 0, 0),
  // },
  // {
  //   id: 12,
  //   title: 'Late Night Event',
  //   start: new Date(2015, 3, 17, 19, 30, 0),
  //   end: new Date(2015, 3, 18, 2, 0, 0),
  // },
  // {
  //   id: 12.5,
  //   title: 'Late Same Night Event',
  //   start: new Date(2015, 3, 17, 19, 30, 0),
  //   end: new Date(2015, 3, 17, 23, 30, 0),
  // },
  // {
  //   id: 13,
  //   title: 'Multi-day Event',
  //   start: new Date(2015, 3, 20, 19, 30, 0),
  //   end: new Date(2015, 3, 22, 2, 0, 0),
  // },
  // {
  //   id: 14,
  //   title: 'Today',
  //   start: new Date(new Date().setHours(new Date().getHours() - 3)),
  //   end: new Date(new Date().setHours(new Date().getHours() + 3)),
  // },
  // {
  //   id: 15,
  //   title: 'Point in Time Event',
  //   start: now,
  //   end: now,
  // },
  // {
  //   id: 16,
  //   title: 'Video Record',
  //   start: new Date(2015, 3, 14, 15, 30, 0),
  //   end: new Date(2015, 3, 14, 19, 0, 0),
  // },
  // {
  //   id: 17,
  //   title: 'Dutch Song Producing',
  //   start: new Date(2015, 3, 14, 16, 30, 0),
  //   end: new Date(2015, 3, 14, 20, 0, 0),
  // },
  // {
  //   id: 18,
  //   title: 'Itaewon Meeting',
  //   start: new Date(2015, 3, 14, 16, 30, 0),
  //   end: new Date(2015, 3, 14, 17, 30, 0),
  // },
  // {
  //   id: 19,
  //   title: 'Online Coding Test',
  //   start: new Date(2015, 3, 14, 17, 30, 0),
  //   end: new Date(2015, 3, 14, 20, 30, 0),
  // },
  // {
  //   id: 20,
  //   title: 'An overlapped Event',
  //   start: new Date(2015, 3, 14, 17, 0, 0),
  //   end: new Date(2015, 3, 14, 18, 30, 0),
  // },
  // {
  //   id: 21,
  //   title: 'Phone Interview',
  //   start: new Date(2015, 3, 14, 17, 0, 0),
  //   end: new Date(2015, 3, 14, 18, 30, 0),
  // },
  // {
  //   id: 22,
  //   title: 'Cooking Class',
  //   start: new Date(2015, 3, 14, 17, 30, 0),
  //   end: new Date(2015, 3, 14, 19, 0, 0),
  // },
  // {
  //   id: 23,
  //   title: 'Go to the gym',
  //   start: new Date(2015, 3, 14, 18, 30, 0),
  //   end: new Date(2015, 3, 14, 20, 0, 0),
  // },
  // {
  //   id: 24,
  //   title: 'DST ends on this day (Europe)',
  //   start: new Date(2022, 9, 30, 0, 0, 0),
  //   end: new Date(2022, 9, 30, 4, 30, 0),
  // },
  // {
  //   id: 25,
  //   title: 'DST ends on this day (America)',
  //   start: new Date(2022, 10, 6, 0, 0, 0),
  //   end: new Date(2022, 10, 6, 4, 30, 0),
  // },
  // {
  //   id: 26,
  //   title: 'DST starts on this day (America)',
  //   start: new Date(2023, 2, 12, 0, 0, 0),
  //   end: new Date(2023, 2, 12, 4, 30, 0),
  // },
  // {
  //   id: 27,
  //   title: 'DST starts on this day (Europe)',
  //   start: new Date(2023, 2, 26, 0, 0, 0),
  //   end: new Date(2023, 2, 26, 4, 30, 0),
  // },
];

export const CardEvent = ({ start_time, end_time, event_guests, ...props }) => (
  <div className="py-3 z-20 ">
    {/* {// console.log(props, "EVE")} */}
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        {/* <CalendarIcon className="w-6 h-6 text-primary" /> */}
        <div>
          <div className="text-lg font-semibold">Fintech Forum</div>
          <div className="text-muted-foreground text-sm ">
            {moment(new Date(start_time)).format("MMM Do YY")}
          </div>
          <div className="text-muted-foreground text-sm ">
            {moment(new Date(end_time)).format("MMM Do YY")}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center gap-4">
        <MapPinIcon className="w-6 h-6 text-primary" />
        <div>
          <div className="text-lg font-semibold">London, UK</div>
          <div className="text-muted-foreground">Fintech Hub</div>
        </div>
      </div> */}
      <div className="grid gap-2">
        <div className="text-sm font-semibold">Invited People:</div>
        <div className="flex flex-col gap-1">
          {event_guests &&
            event_guests.map(({ email }, ind) => (
              <div key={ind} className="text-muted-foreground">{email}</div>
            ))}
        </div>
      </div>
    </div>
  </div>
);

function EventCardPopup({ title, name, ...props }) {
  return (
    <TooltipProvider  >
      <Tooltip className="z-50">
        <TooltipTrigger asChild>
          <p variant="outline" className="text-white z-[-2] ">
            {name}
          </p>
        </TooltipTrigger>
        <TooltipContent className="w-64 bg-gray-700 z-50 bg-card text-card-foreground shadow-lg">
          <CardEvent {...props} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function CreateEventWithNoOverlap({
  //   localizer,
  eventsList,
  dayLayoutAlgorithm = "no-overlap",
}) {
  // // console.log(eventsList, "-----eventsList");
  const localizer = momentLocalizer(moment);
  const [myEvents, setEvents] = useState(events);
  const [defaultView, setdefaultView] = useState(Views.WEEK);
  // defaultView={Views.WEEK}

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt("New Event Name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => {
      // // console.log(JSON.stringify(event));
    },

    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(20, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const eventsData = eventsList.map((event) => ({
    title: event.name,
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    ...event,
  }));

  // // console.log(eventsData, "00000000000000000");

  return (
    <Fragment>
      <Card className="p-5">
        <Calendar
          dayLayoutAlgorithm={dayLayoutAlgorithm}
          // defaultDate={defaultDate}
          // defaultView={defaultView}
          events={eventsData}
          localizer={localizer}
          // onSelectEvent={handleSelectEvent}
          // onSelectSlot={handleSelectSlot}
          // selectable
          scrollToTime={scrollToTime}
          style={{ height: 500 }}
          components={{
            event: ({ event }) => {
              // // console.log(event)
              return <EventCardPopup {...event} />;
            },
          }}
        />
      </Card>
    </Fragment>
  );
}

CreateEventWithNoOverlap.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  dayLayoutAlgorithm: PropTypes.string,
};
