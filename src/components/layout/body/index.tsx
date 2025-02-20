import React, { ReactNode } from 'react'

const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className='mt-15'>{children}</div>
    )
}

export default Body