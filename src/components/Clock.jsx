import { useEffect, useState } from "react";
import "./Clock.css";

export default function Clock() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            // Türkçe tarih (örn: Pazartesi, 9 Haziran 2025)
            const formattedDate = now.toLocaleDateString("tr-TR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });

            // Saat (örn: 14:05:07)
            const formattedTime = now.toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });

            setDate(formattedDate);
            setTime(formattedTime);
        };

        updateDateTime(); // İlk çağırma
        const interval = setInterval(updateDateTime, 1000); // Her saniye güncelle

        return () => clearInterval(interval); // Temizlik
    }, []);

    return (
        <div className="clock-container">
            <div className="clock-date">{date}</div>
            <div className="clock-time">{time}</div>
        </div>
    );
}
