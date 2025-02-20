import React from 'react'

interface MovieProps {
    id: string;
    title: string;
    poster: string;
    year: string;
    onClick: () => void
}

const MovieCard: React.FC<MovieProps> = ({ id, title, poster, year, onClick }) => {
    return (
        <div key={id} className="bg-white border rounded-lg shadow-lg overflow-hidden " onClick={onClick}>
            <figure className="relative">
                <img src={poster} alt={title} className="w-full h-64 object-cover" />
                <figcaption className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                    {title} ({year})
                </figcaption>
            </figure>
            <div className="p-4">
                <h3 className="text-lg text-gray-600 font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{year}</p>
            </div>
        </div>
    )
}

export default MovieCard