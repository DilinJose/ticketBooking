import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import Body from '../../components/layout/body'

const Booked = () => {
    const details = useSelector((state: RootState) => state.bookingDetails.bookingDetails)

    return (
        <Body>
            <div className='flex items-center justify-center'>
                <h1 className='text-5xl'>Congragulation</h1>
                {/* <h4>{`Your have bought ${details?.seatLayout} tickets for the ${}`} </h4> */}
            </div>
        </Body>
    )
}

export default Booked