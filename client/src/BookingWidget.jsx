import { useState } from "react";
import { differenceInCalendarDays } from 'date-fns';

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [noOfGuests, setNoOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place.price} / per night 
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label>Check in date : </label>
                        <input type="date" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out date : </label>
                        <input type="date" 
                            value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>  
                <div className="py-3 px-4 border-t">
                    <label>Number of guests: </label>
                    <input type="number" 
                        value={noOfGuests} 
                        onChange={ev => setNoOfGuests(ev.target.value)} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name: </label>
                        <input type="text" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)} />
                        <label>Your phone number: </label>
                        <input type="tel" 
                            value={mobile} 
                            onChange={ev => setMobile(ev.target.value)} />
                    </div>
                )}
            </div>
            <button className="primary mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <>
                        <span> for ${numberOfNights * place.price}</span>
                    </>
                )}
            </button>
        </div>
    )
}