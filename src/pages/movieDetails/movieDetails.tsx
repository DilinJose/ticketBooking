import React, { useEffect } from 'react'
import data from "../../../data.json"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { useNavigate, useParams } from 'react-router'
import { getMovieDetails } from '../../redux/slice/movieSlice'
import routers from '../../utils/common/routers'
import Body from '../../components/layout/body'


const MovieDetails: React.FC = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const movieDetails = useSelector((state: RootState) => state.movies.movieDetails)
    const movieDetails = data.details


    useEffect(() => {
        if (id) {
            dispatch(getMovieDetails(id));
        }
    }, [dispatch, id]);

    const handleClick = () => {
        navigate(`${routers.ROUTERS.BUY_TICKETS}/${id}`)
    }

    return (
        <Body>
            <div className='border w-full flex items-center px-50 justify-start p-5 gap-5'>
                <div className='rounded-lg w-60 h-80'>
                    <figure className='h-full flex flex-col justify-between items-center'>
                        <img className='rounded-t-lg w-full  h-full object-cover' src={movieDetails?.poster} alt={movieDetails?.title} />
                        <figcaption className='w-full text-center bg-gradient-to-t from-black to-transparent text-white'>
                            in cinemas
                        </figcaption>
                    </figure>
                </div>
                <div className='p-5 flex items-start justify-start flex-col gap-3'>
                    <h1 className='font-bold text-2xl'>{movieDetails?.title}</h1>
                    <div className=' bg-slate-700  text-white p-3 rounded-lg'>
                        <p>ratings:{movieDetails?.imdbRating}<span>, votes:({movieDetails?.imdbVotes})</span></p>
                    </div>
                    <div className='flex items-center justify-start gap-3'>
                        {movieDetails?.language?.split(",").map(lang => {
                            return (
                                <span className='border px-3 py-1 bg-slate-100 border-gray-200 '>{lang}</span>
                            )
                        })}
                    </div>
                    <div className='flex items-center justify-start gap-3'>
                        <span>{movieDetails?.runtime} |</span>
                        <span>{movieDetails?.genre} |</span>
                        <span>{movieDetails?.released}</span>
                    </div>
                    <div>
                        <button className='h-11 px-3 py-1 rounded-lg bg-slate-700 text-white hover:bg-slate-950' onClick={handleClick}>Book Tickets</button>
                    </div>
                    <div>
                    </div>
                </div>

            </div>
        </Body>
    )
}

export default MovieDetails