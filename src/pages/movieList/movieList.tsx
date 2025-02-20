import React, { useEffect } from 'react'
import { getMovieList } from '../../redux/slice/movieSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store/store'
import MovieCard from '../../components/cards/movieCard'
import { useNavigate } from 'react-router'
import routers from '../../utils/common/routers'
import Body from '../../components/layout/body'

const MovieList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const movies = useSelector((state: RootState) => state.movies.movieList)

    useEffect(() => { dispatch(getMovieList("all")) }, [dispatch])

    const handleClick = (id: string) => {
        navigate(`${routers.ROUTERS.MOVIE_DETAILS}/${id}`)
    }
    return (
        <Body>
            <div className="grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                {
                    movies.map(({ id, title, poster, year }) => (
                        <MovieCard key={id} id={id} title={title} poster={poster} year={year} onClick={() => handleClick(id)} />
                    ))
                }
            </div>
        </Body>
    )
}

export default MovieList