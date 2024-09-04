"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopupModal } from "react-calendly";
import CreateEventWithNoOverlap from "@/components/meeting-calendar";
import axios from "axios";
import moment from "moment";
import AuthLayout from "../context/AuthLayout";

const headers = {
  Authorization:
    "Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzIyODAyMzYzLCJqdGkiOiJmMzA5ZTU5Zi1jZjU5LTRiZTAtOGMxOC00YmVlMzRjMzQ1YjgiLCJ1c2VyX3V1aWQiOiI3ODM1MjhlNy1kN2NiLTQ3YmMtODIwZi03YjQ2ODBmMTM5OWUifQ.YR5c6Vbf7_8iTdqsSxeLH0j4s9cTLZv4jdmBruGVocCTMLHhpSMAS2SqCiGOqvqiQoqXjpSb0mf9-NH9h2HHtA",
};

const CustomButtonExample = ({
  pageSettings,
  utm,
  prefill,
  setEventsList,
  sectionButtonTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);

  const handleCloseModal = async () => {
    try {
      const response = await axios.get(
        "https://api.calendly.com/scheduled_events?organization=https://api.calendly.com/organizations/1433eb7b-7933-45ae-9781-8c17a8c3b180",
        { headers }
      );
      setEventsList(response.data.collection);
      setIsOpen(false);
    } catch (err) {

    }
  };
  const url = "https://calendly.com/oyte-studybuddy/60min";

  const openModelEvent = async () => {
    try {
      handleOpenModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {sectionButtonTitle && (
        <Button
          style={{ display: "block", margin: "0 auto" }}
          onClick={openModelEvent}
        >
          {sectionButtonTitle}
        </Button>
      )}
      <PopupModal
        url={url}
        pageSettings={pageSettings}
        utm={utm}
        prefill={prefill}
        onModalClose={handleCloseModal}
        open={isOpen}
        rootElement={
          typeof window !== "undefined"
            ? document.getElementById("rooot")
            : null
        }
      />
    </div>
  );
};

const SectionHeader = ({
  sectionTitle,
  sectionButtonTitle,
  sectionButtonRoute,
  setEventsList,
  ref,
}) => {
  return (
    <div className=" w-full items-center justify-between  text-sm flex">
      <h2 className="mt-10 scroll-m-20 text-xl md:text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {sectionTitle}
      </h2>
      <div className="   items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <CustomButtonExample
          setEventsList={setEventsList}
          sectionButtonTitle={sectionButtonTitle}
          ref={ref}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const meetRef = useRef(null);
  const [eventsList, setEventsList] = useState([
    { id: 1, title: "Project Kickoff - StudyBuddy React Development", start_time: new Date() },
    { id: 2, title: "Design Review Session - UI/UX for StudyBuddy", start_time: new Date(new Date().setDate(new Date().getDate() + 1)) },
    { id: 3, title: "Code Refactor Workshop - StudyBuddy Components", start_time: new Date(new Date().setDate(new Date().getDate() + 2)) }
  ]);

  useEffect(() => {
    // Here you can replace this mock setup with a real API call
    // getEvents();
  }, []);

  const getEvents = async () => {
    const response = await axios.get(
      "https://api.calendly.com/scheduled_events?organization=https://api.calendly.com/organizations/1433eb7b-7933-45ae-9781-8c17a8c3b180",
      { headers }
    );
    console.log(response, "response")
    setEventsList(response.data.collection);
  };
  return (
    <AuthLayout route="/manage-meetings">
      <main className="flex min-h-screen flex-col justify-between items-center p-5  lg:p-32">
        <div className="container max-w-[100%] lg:max-w-4xl xl:max-w-5xl  2xl:max-w-7xl px-0 md:px-0">
          <SectionHeader
            setEventsList={setEventsList}
            ref={meetRef}
            sectionButtonTitle="Create Meeting"
            sectionTitle="Meeting"
          />
          <div className="mt-8">
            <CreateEventWithNoOverlap eventsList={eventsList} />
          </div>
          <div className="mt-10">
            {eventsList.map(event => (
              <Card key={event.id} className="mb-4">
                <CardContent>
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                  <p className="text-sm">{moment(event.start_time).format('LLLL')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div ref={meetRef} id="rooot"></div>
      </main>
    </AuthLayout>
  );
}
