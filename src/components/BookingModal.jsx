import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
// import axios from "axios";
import { axiosAuthAPI } from "../config/axios-instance";

const BookingModal = ({ doctor, setMyAppointments }) => {
    const [open, setOpen] = useState(false);
    const [bookData, setBookData] = useState({
        date: "",
        startTime: "",
        endTime: "",
        department: "",
        type: "in-person",
        reason: "",
    });
    const { date, startTime, endTime, department, type, reason } = bookData
    const today = new Date().toISOString().split("T")[0];

    // console.log(doctor)
    const handleChange = (e) => {
        setBookData({ ...bookData, [e.target.name]: e.target.value })
    }
    const handleBookAppointment = async (e) => {
        e.preventDefault();
        if (!date || !startTime || !endTime || !department || !reason) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await axiosAuthAPI.post('/appointments',
                {
                    doctorId: doctor._id,
                    date,
                    startTime: startTime,
                    endTime: endTime, // temp (same time)
                    department, // temp
                    reason,
                }, )

            alert("Appointment booked ✅");

            setMyAppointments(prev => [...prev, res.data.appointment || res.data]);

            setOpen(false);


        } catch (error) {
            alert(error.response?.data?.message || "Booking failed ❌");
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 text-white hover:from-sky-700 hover:to-cyan-600">Book Appointment</Button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl border-slate-200">
                <DialogHeader>
                    <DialogTitle>
                        Book Appointment of{" "}
                        <span className="text-red-600">
                            {doctor?.username}
                        </span>
                    </DialogTitle>

                    <DialogDescription>
                        Fill all details to schedule your appointment.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-3">
                    {/* Date */}
                    <Input
                        type="date"
                        name="date"
                        value={date}
                        min={today}
                        onChange={handleChange}
                        className="rounded-xl"
                    />

                    {/* Start Time */}
                    <Input
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={handleChange}
                        className="rounded-xl"
                    />

                    {/* End Time */}
                    <Input
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={handleChange}
                        className="rounded-xl"
                    />

                    {/* Department */}
                    {/* <Input
                        type="text"
                        name="department"
                        placeholder="Department (e.g. Cardiology)"
                        value={department}
                        onChange={handleChange}
                    /> */}
                    <select
                        name="department"
                        value={department}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    >
                        <option value="general">general</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermalogist">Dermalogist</option>
                    </select>

                    {/* Type */}
                    <select
                        name="type"
                        value={type}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2"
                    >
                        <option value="in-person">In-person</option>
                        <option value="online">Online</option>
                        <option value="emergency">Emergency</option>
                    </select>

                    {/* Reason */}
                    <Textarea
                        placeholder="Reason for visit"
                        name="reason"
                        value={reason}
                        onChange={handleChange}
                        className="rounded-xl"
                    />

                    <Button
                        className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-cyan-500 hover:from-sky-700 hover:to-cyan-600"
                        onClick={handleBookAppointment}
                    >
                        Confirm Booking
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BookingModal;