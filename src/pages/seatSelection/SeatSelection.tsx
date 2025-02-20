import React, { useEffect, useState } from 'react'
import Body from '../../components/layout/body';
import { useDispatch } from 'react-redux';
import { setLayoutAndPrizing } from '../../redux/slice/bookingSlice';
import { useNavigate } from 'react-router';
import routers from '../../utils/common/routers';
import { AppDispatch } from '../../redux/store/store';

const SeatSelection: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [prizing, setPrizing] = useState({ silver: 0, gold: 0, platinum: 0 })
    const ROWS = 10;
    const COLS = 15;

    useEffect(() => {
        let silverPrize = 0
        let goldPrize = 0
        let platinumPrize = 0
        selectedSeats.map(seatId => {
            console.log();
            const [rowId] = seatId.split("")

            if (rowId === 'A' || rowId === 'B') {
                silverPrize += 100
            }
            else if (rowId === 'C' || rowId === 'D' || rowId === 'E') {
                goldPrize += 150
            } else {
                platinumPrize += 200
            }
        })
        setPrizing({ silver: silverPrize, gold: goldPrize, platinum: platinumPrize })

    }, [selectedSeats])

    const getTierColor = (row: number) => {
        if (row < 2) return 'bg-gray-200';
        if (row < 5) return 'bg-yellow-100';
        return 'bg-purple-100';
    };

    const handleSeatClick = (seatId: string) => {
        if (selectedSeats.length <= 8) {
            if (selectedSeats.includes(seatId)) {
                setSelectedSeats(selectedSeats.filter(seat => seat !== seatId))
            } else {
                setSelectedSeats([...selectedSeats, seatId])
            }
        } else {
            alert('You can only book 8 tickets at a time')
        }

    }

    const handleBuyTicket = () => {
        const payload = {
            seatLayout: selectedSeats,
            total: total
        }
        dispatch(setLayoutAndPrizing(payload))
        navigate(routers.ROUTERS.BOOKED)
    }

    const total = prizing.silver + prizing.gold + prizing.platinum

    return (
        <Body>
            <div className=''>
                <div className='px-20 py-5 flex items-center justify-center gap-5'>
                    <div className='flex items-center'>
                        <div className='w-5 h-5 bg-gray-200'></div>
                        <span>Silver</span>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-5 h-5 bg-yellow-100'></div>
                        <span>Gold</span>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-5 h-5 bg-purple-100'></div>
                        <span>Platinum</span>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <div className=" w-2/4 h-8 bg-gray-800 rounded-t-xl mb-10 flex items-center justify-center">
                        <span className="text-white text-sm">Screen</span>
                    </div>
                </div>

                <div className="grid gap-2">
                    {Array.from({ length: ROWS }, (_, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center gap-2">

                            {Array.from({ length: COLS }, (_, colIndex) => {
                                const seatId = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;

                                const isSelected = selectedSeats.includes(seatId);

                                return (
                                    <button
                                        key={seatId}
                                        onClick={() => handleSeatClick(seatId)}
                                        className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-colors border-1 ${isSelected ? 'border-red-500 border-3 text-red-500 font-bold' : 'hover:bg-slate-500'} ${getTierColor(rowIndex)}`}
                                    >
                                        {seatId}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                <div className='bg-gray-100 my-5 py-4'>
                    <div className='flex items-center justify-center gap-5 '>
                        {prizing.silver > 0 && <h4 className='font-bold text-md'>{`Silver Tier Tickest : $${prizing.silver}`}</h4>}
                        {prizing.gold > 0 && <h4 className='font-bold text-md'>{`Gold Tier Tickest : $${prizing.gold}`}</h4>}
                        {prizing.platinum > 0 && <h4 className='font-bold text-md'>{`Platinum Tier Tickest : $${prizing.platinum}`}</h4>}
                    </div>
                    <div className='flex items-center justify-center mt-3'>
                        <h4 className='font-bold text-red-600 text-md'>{`Total : $${total}`}</h4>
                    </div>
                    <div className='flex items-center justify-center mt-3'>
                        <button className='border rounded-lg w-25 h-10 bg-red-500 text-white' onClick={handleBuyTicket}>Buy Ticket</button>
                    </div>
                </div>
            </div>

        </Body>
    )
}

export default SeatSelection