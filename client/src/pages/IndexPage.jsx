import { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([...response.data]);
        })
    }, [])

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('q');
        let fetchUrl = '/places';
        if (searchQuery) {
            fetchUrl = `/search?q=${encodeURIComponent(searchQuery)}`
        }
        axios.get(fetchUrl).then(response => {
            setPlaces([...response.data]);
        });
    }, [location.search])

    return (
        <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link to={'/place/'+place._id}>
                    {place.photos?.[0] && (
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos[0]} alt="" />
                        </div>
                    )}
                    <h2 className="font-bold">{place.address}</h2>
                    <h2 className="text-sm text-gray-500">{place.title}</h2>
                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per night
                    </div>
                </Link>
            ))}
        </div>
    )
}