import React from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import "./Admin.css"

const bookings = [
  { id: 1, name: "John Doe", event: "Tech Conference", status: "confirmed" },
  { id: 2, name: "Jane Smith", event: "Marketing Summit", status: "pending" },
  { id: 3, name: "Mike Johnson", event: "AI Expo", status: "cancelled" },
];

const getStatusIcon = (status) => {
  switch (status) {
    case "confirmed":
      return <FaCheckCircle className="text-green-500" />;
    case "pending":
      return <FaClock className="text-yellow-500" />;
    case "cancelled":
      return <FaTimesCircle className="text-red-500" />;
    default:
      return null;
  }
};

const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Event</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-3 border">{booking.id}</td>
                <td className="p-3 border">{booking.name}</td>
                <td className="p-3 border">{booking.event}</td>
                <td className="p-3 border flex items-center gap-2">
                  {getStatusIcon(booking.status)} {booking.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
