import { useState } from "react";
import axios from 'axios';
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav";

export default function PlacesFormPage () {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text) {
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput(header, description) {
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function addNewPlace(ev){
        ev.preventDefault();
        const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests};
        await axios.post('/places', placeData);
    }

    return(
        <div>
            <AccountNav/ >
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title for your place, should be short and catchy')}
                <input type="text" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)} 
                    placeholder="title" />

                {preInput('Address', 'Address to this place')}
                <input type="text" 
                    value={address} 
                    onChange={ev => setAddress(ev.target.value)} 
                    placeholder="address" />

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of the place')}
                <textarea 
                    value={description} 
                    onChange={ev => setDescription(ev.target.value)} />

                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-2">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra Info', 'house rules, etc')}
                <textarea 
                    value={extraInfo} 
                    onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check In & Out Times + Max Guests', 'Add check in and check out times & remember to have some time for cleaning')}
                <div className="grid sm:grid-cols-3 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check In Time</h3>
                        <input type="text" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)} 
                            placeholder="14:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check Out Time</h3>
                        <input type="text" 
                            value={checkOut} 
                            onChange={ev => setCheckOut(ev.target.value)} 
                            placeholder="10:00" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max Number of Guests</h3>
                        <input type="number" 
                            value={maxGuests} 
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}