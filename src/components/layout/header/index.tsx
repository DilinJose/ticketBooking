import React, { useState } from 'react'
import { IMAGES } from '../../../utils/common/common'
import { getMovieList } from '../../../redux/slice/movieSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store/store'
import { useLocation } from 'react-router'

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()
    const [searchTerm, setSearchTerm] = useState("")

    const handleClick = () => {
        dispatch(getMovieList(searchTerm))
    }
    return (
        <header className='w-full fixed top-0 right-0 bg-slate-500 p-2 z-10'>
            <nav className='flex justify-between items-center'>
                <div className='flex justify-between items-center gap-7'>
                    <img width={80} height={80} src={IMAGES.logo} alt='logo' />
                    {location.pathname === "/" && <div className='flex justify-between items-center gap-3'>
                        <input className='form-control' type='text' placeholder='Search for movies' onChange={(e) => setSearchTerm(e.target.value)} />
                        <button className='h-10 px-3 py-1 rounded-lg bg-slate-700 text-white hover:bg-slate-950' onClick={handleClick}>Search</button>
                    </div>}

                </div>

                {/* <div>
                    <button className='w-22 h-10 border border-neutral-600 rounded-lg'>Signin </button>
                </div> */}
            </nav>
        </header>
    )
}

export default Header