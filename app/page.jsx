"use client"; // Ensure this component is treated as a client-side component

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AuthLayout from "../context/AuthLayout";
import Modal from "@/components/ui/Modal";

const localizer = momentLocalizer(moment);

export default function Home() {
    const [meetings, setMeetings] = useState([]);
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Load meetings from localStorage on component mount
    useEffect(() => {
        const savedMeetings = localStorage.getItem('meetings');
        if (savedMeetings) {
            setMeetings(JSON.parse(savedMeetings));
        }
    }, []);

    // Save meetings to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }, [meetings]);

    const handleSelectEvent = event => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleEventChange = (field, value) => {
        setSelectedEvent(prev => ({ ...prev, [field]: value }));
    };

    const saveChanges = () => {
        setMeetings(prev => prev.map(event => event.id === selectedEvent.id ? selectedEvent : event));
        setShowModal(false);
        setSelectedEvent(null);
    };

    const deleteEvent = () => {
        setMeetings(prev => prev.filter(event => event.id !== selectedEvent.id));
        setShowModal(false);
        setSelectedEvent(null);
    };

    const handleCreateMeeting = () => {
        if (!meetingTitle || !meetingTime) {
            alert("Please fill in all fields.");
            return;
        }
        const newMeeting = {
            id: meetings.length + 1,
            title: meetingTitle,
            start: new Date(meetingTime),
            end: new Date(new Date(meetingTime).getTime() + 60 * 60000), // adds 60 minutes to start time
            allDay: false
        };
        setMeetings([...meetings, newMeeting]);
        setMeetingTitle('');
        setMeetingTime('');
    };

    return (
        <AuthLayout route="/manage-meetings">
            <main className="flex min-h-screen flex-col justify-center items-center p-5 lg:p-32">
                <div className="container max-w-4xl mx-auto px-4">
                    <h1 className="text-xl font-semibold mb-4">Create New Meeting</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Meeting Title"
                            value={meetingTitle}
                            onChange={e => setMeetingTitle(e.target.value)}
                            className="border px-2 py-1 mr-2"
                        />
                        <input
                            type="datetime-local"
                            value={meetingTime}
                            onChange={e => setMeetingTime(e.target.value)}
                            className="border px-2 py-1"
                        />
                        <Button onClick={handleCreateMeeting}>Create Meeting</Button>
                    </div>
                    <div className="mt-10">
                        <Calendar
                            localizer={localizer}
                            events={meetings}
                            startAccessor="start"
                            endAccessor="end"
                            onSelectEvent={handleSelectEvent}
                            style={{ height: 500 }}
                        />
                    </div>
                </div>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <h2>Edit Meeting</h2>
                        <input
                            type="text"
                            value={selectedEvent?.title || ''}
                            onChange={e => handleEventChange('title', e.target.value)}
                            className="border px-2 py-1 mb-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={selectedEvent?.description || ''}
                            onChange={e => handleEventChange('description', e.target.value)}
                            className="border px-2 py-1 mb-2 w-full"
                        />
                        <Button onClick={saveChanges} className="mr-2">Save</Button>
                        <Button onClick={deleteEvent} variant="destructive">Delete</Button>
                    </Modal>
                )}
            </main>
        </AuthLayout>
    );
}
