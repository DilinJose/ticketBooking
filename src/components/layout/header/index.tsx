import React, { useState } from 'react'
import { IMAGES } from '../../../utils/common/common'

const Header: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("")
    console.log('searchTerm', searchTerm)
    return (
        <header className='w-full fixed top-0 right-0 bg-slate-500 p-2'>
            <nav className='flex justify-between items-center'>
                <div className='flex justify-between items-center'>
                    <img width={80} height={80} src={IMAGES.logo} alt='logo' />
                    <input className='form-control' type='text' placeholder='Search for movies' onChange={(e) => setSearchTerm(e.target.value)} />

                </div>

                <div>
                    <button  className='w-22 h-10 border border-neutral-600 rounded-lg'>Signin </button>
                </div>
            </nav>
        </header>
    )
}

export default Header