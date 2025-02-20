import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Body from '../../components/layout/body'
import ConfettiComponent from '../../components/confetti'
import routers from '../../utils/common/routers'
import { useNavigate } from 'react-router'
import jsPDF from 'jspdf';

const Booked = () => {
    const navigate = useNavigate()
    const details = useSelector((state: RootState) => state.bookingDetails.bookingDetails)
    const downloadPDF = async (seatCount: number, title: string, date: string, time: string, total: string, seatLayout: string[]) => {
        const doc = new jsPDF({
            orientation: "landscape",
            unit: "in",
            format: [4, 2]
        });

        // Set font size
        doc.setFontSize(10);

        doc.text(`Title: ${title}`, 0.2, 0.5);
        doc.text(`Date: ${date}`, 0.2, 0.8);
        doc.text(`Time: ${time}`, 0.2, 1.1);
        doc.text(`Seats: ${seatCount}`, 0.2, 1.4);
        doc.text(`Total: ${total}`, 0.2, 1.7);

        if (seatLayout.length > 0) {
            doc.text(`Seats: ${seatLayout.join(", ")}`, 0.2, 2.0);
        }
        doc.save("ticket.pdf");
    };

    return (
        <Body>
            <ConfettiComponent />
            <div className='flex items-center justify-center flex-col h-screen gap-5'>
                <div className="p-5 border border-gray-400 rounded-lg bg-white text-center">
                    <h1 className='text-5xl'>🎉 Congratulations 🎉</h1>
                    <h4>{`You have bought ${details?.seatLayout?.length ?? 0} tickets for ${details?.title ?? "a movie"}`}</h4>
                    <p><strong>Date:</strong> {details?.date ?? "N/A"}</p>
                    <p><strong>Time:</strong> {details?.time ?? "N/A"}</p>
                    <p><strong>Seats:</strong> {details?.seatLayout?.join(", ") ?? "N/A"}</p>
                    <p><strong>Amount:</strong> ${details?.total ?? 0}</p>
                </div>
                <div className='flex justify-center items-center gap-5'>

                    <button
                        onClick={() => downloadPDF(details?.seatLayout?.length, details?.title, details?.date, details?.time, details?.total, details?.seatLayout)}
                        className='w-32 h-10 border border-neutral-600 rounded-lg mt-5 curser-pointer'>
                        Download PDF
                    </button>
                    <button
                        onClick={() => navigate(routers.ROUTERS.HOME)}
                        className='w-32 h-10 border border-neutral-600 rounded-lg mt-5 curser-pointer'>
                        Go Home
                    </button>
                </div>
            </div>

        </Body>
    )
}

export default Booked