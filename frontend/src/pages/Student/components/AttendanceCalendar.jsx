import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMonthlyAttendance } from "../../../services/attendanceService";

const AttendanceCalendar = () => {
    const [value, setValue] = useState(new Date());
    const [attendanceMap, setAttendanceMap] = useState({});

    useEffect(() => {
        const fetchAttendance = async () => {
            const month = value.toISOString().slice(0, 7); // e.g., 2025-04
            const data = await getMonthlyAttendance({ month });

            const map = {};
            data.forEach((entry) => {
                map[entry.date] = entry;
            });

            setAttendanceMap(map);
        };

        fetchAttendance();
    }, [value]);

    const tileClassName = ({ date }) => {
        const key = date.toISOString().slice(0, 10);
        const entry = attendanceMap[key];

        if (entry?.status === "present") return "bg-success text-white rounded";
        if (entry?.status === "absent") return "bg-secondary text-white rounded";
        return "";
    };

    const tileContent = ({ date }) => {
        const key = date.toISOString().slice(0, 10);
        const entry = attendanceMap[key];

        if (entry?.loginTime) {
            return <small className="d-block text-white text-center">{entry.loginTime}</small>;
        }
        return null;
    };

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <h5 className="card-title">📅 Attendance Calendar</h5>
                <Calendar
                    onChange={setValue}
                    value={value}
                    tileClassName={tileClassName}
                    tileContent={tileContent}
                />
            </div>
        </div>
    );
};

export default AttendanceCalendar;
