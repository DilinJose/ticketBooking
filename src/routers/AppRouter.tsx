import React from 'react'
import { Route, Routes } from 'react-router'
import MovieDetails from '../pages/movieDetails/movieDetails'
import MovieList from '../pages/movieList/movieList'
import routers from '../utils/common/routers'
import Header from '../components/layout/header'
import BookTickets from '../pages/bookTickets/bookTickets'
import SeatSelection from '../pages/seatSelection/SeatSelection'
import Booked from '../pages/booked/booked'

const AppRouter: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path={routers.ROUTERS.HOME} element={<MovieList />} />
                <Route path={routers.ROUTERS.MOVIE_DETAILS}>
                    <Route path={routers.SUB_ROUTERS.MOVIE_DETAILS_ID} element={<MovieDetails />} />
                </Route>
                <Route path={routers.ROUTERS.BUY_TICKETS}>
                    <Route path={routers.SUB_ROUTERS.MOVIE_DETAILS_ID} element={<BookTickets />} />
                </Route>
                <Route path={routers.ROUTERS.SEAT_LAYOUT} element={<SeatSelection />} />
                <Route path={routers.ROUTERS.BOOKED} element={<Booked />} />
            </Routes>
        </>
    )
}

export default AppRouter