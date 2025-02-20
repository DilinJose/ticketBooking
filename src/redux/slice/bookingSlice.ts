import { createSlice } from '@reduxjs/toolkit'

export interface BookingDetailsProps {
    id: string;
    date?: string;
    time?: string;
    seatLayout?: string[];
    total?: number;
    title?: string;
}
export interface BookingProps {
    bookingDetails: BookingDetailsProps;
    isLoaded: boolean;
    error: string | null
}


const initialState: BookingProps = {
    bookingDetails: {
        id: "",
        date: "",
        time: "",
        seatLayout: [],
        total: 0,
        title: ""
    },
    isLoaded: false,
    error: null,
};

export const BookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setBookingDetails: (state, action) => {
            state.bookingDetails = action.payload
        },
        setLayoutAndPrizing: (state, action) => {
            state.bookingDetails = { ...state.bookingDetails, ...action.payload }
        }
    },
})

export const { setBookingDetails, setLayoutAndPrizing } = BookingSlice.actions
export default BookingSlice.reducer;
