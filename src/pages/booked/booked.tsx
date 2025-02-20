import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Body from '../../components/layout/body'
import ConfettiComponent from '../../components/confetti'

const Booked = () => {
    const details = useSelector((state: RootState) => state.bookingDetails.bookingDetails)

    return (
        <Body>
            <ConfettiComponent />
            <div className='flex items-center justify-center flex-col h-screen gap-5'>
                <h1 className='text-5xl'>Congragulation</h1>
                <h4>{`Your have bought ${details?.seatLayout?.length ?? ""} tickets for the ${details?.tilte ?? ""}`} </h4>
                <p>Date : {details?.date ?? ""}</p>
                <p>Time : {details?.time ?? ""}</p>
                <p>Seats : {details?.seatLayout?.map(seat => seat + ", ") ?? ""}</p>
                <p>Amound : {details?.total ?? ""}</p>
            </div>
        </Body>
    )
}

export default Booked