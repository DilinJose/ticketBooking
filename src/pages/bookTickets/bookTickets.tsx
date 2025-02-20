import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { AppDispatch, RootState } from '../../redux/store/store'
import { getMovieDetails } from '../../redux/slice/movieSlice'
import data from "../../../data.json"
import { getCurrentDate, getNextDate } from '../../utils/convert/datetime'
import { setBookingDetails } from '../../redux/slice/bookingSlice'
import routers from '../../utils/common/routers'
import Body from '../../components/layout/body'

const BookTickets: React.FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [selectedDate, setSelectedDate] = useState("")
    const movieDetails = useSelector((state: RootState) => state.movies.movieDetails)

    const dates = [getCurrentDate(), getNextDate()]

    useEffect(() => {
        if (id) {
            dispatch(getMovieDetails(id));
        }
    }, [dispatch, id]);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date)
    }

    const handleBookingTime = (time: string) => {
        const payload = {
            id,
            tilte: movieDetails?.title ?? "",
            date: selectedDate,
            time
        }
        dispatch(setBookingDetails(payload))
        navigate(routers.ROUTERS.SEAT_LAYOUT)
    }

    return (
        <Body>
            <div>
                <div className='p-5 border-b-1 border-slate-100'>
                    <h1 className='text-4xl font-bold my-2'>{movieDetails?.title}</h1>
                    <div className='flex items-center justify-start gap-3'>
                        {movieDetails?.genre?.split(",").map(genr => {
                            return (
                                <span className='border rounded-lg px-3 py-1 bg-slate-100 border-gray-200 '>{genr}</span>
                            )
                        })}
                    </div>
                </div>
                <div className='border-b-1 border-slate-100 p-5 flex justify-start items-center gap-5 '>
                    {
                        dates.map((date, index) => {
                            console.log('selectedDate', selectedDate)
                            console.log('date', date)
                            console.log('selectedDate == date', selectedDate == date)
                            return (
                                <React.Fragment key={index}>
                                    <button className={`${selectedDate == date ? "bg-slate-300" : ""} border rounded-2xl px-2 py-1 border-green-700 hover:bg-slate-300 cursor-pointer`} onClick={() => handleDateSelect(date)}>{date}</button>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
                <div className='p-5'>
                    {selectedDate && (<><h2 className='text-2xl font-medium my-2'>Available Shows</h2>
                        <div className='flex items-center justify-start gap-3'>
                            {
                                data.timings.map(time => (
                                    <div className='border bg-slate-300 hover:bg-slate-600 text-white p-3 rounded-lg flex items-center justify-center flex-col' onClick={() => handleBookingTime(time)}>
                                        {time}
                                    </div>
                                ))
                            }
                        </div></>)}
                </div>
            </div>

        </Body>
    )
}

export default BookTickets