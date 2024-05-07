import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; 
import Navbar from "./Navbar";
// 
    // { coordinates: [73.00204753768443, 19.070797941347514], name: 'Soil Lab 2' },
    // { coordinates: [72.99800871453105, 19.15284191660462], name: 'Soil Lab 3' },
    // { coordinates: [73.77863323334843, 18.603486549419912], name: 'Soil Lab 4' },
    // 

const Maps = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(72.87);
    const [lat, setLat] = useState(19.07);
    const [zoom, setZoom] = useState(9);
    const [inpLng, setInpLng] = useState('');
    const [inpLat, setInpLat] = useState('');

    mapboxgl.accessToken = "pk.eyJ1Ijoic2FoaWxuYXJlNzgiLCJhIjoiY2t5MDdndHEwMDBlczJxb2FvMmtoemR3ZiJ9.oyPoHxer2FC8Kr5P2f6BSg";

    const addMarkers = () => {
        if (!map.current) return;

        const soilLabLocations = [
            { coordinates: [72.8873203934424, 19.07072453345615], name: 'Global lab' },
            { coordinates: [73.00204753768443, 19.070797941347514], name: 'GVM Test House And Research Centre' },
            { coordinates: [72.99800871453105, 19.15284191660462], name: 'Global lab' },
            { coordinates: [73.77863323334843, 18.603486549419912], name: 'GS BURO INDIA SERVICES' },
            { coordinates: [73.79823011846563, 18.65244449412182], name: 'Csrl - Structwel Lab pune Pvt. Ltd' },
            { coordinates: [73.85530291968455, 20.187104174554072 ], name: 'ASP Laboratories' },
            { coordinates: [73.75171281147682, 20.013754167109166 ], name: 'MAKE Infracon Material Testing NSV FWD NDT LAB' }
        ];

        soilLabLocations.forEach((location) => {
            const { coordinates, name, color } = location;
            const marker = new mapboxgl.Marker({ color: 'red' })
                .setLngLat(coordinates)
                .addTo(map.current);
                const popup = new mapboxgl.Popup()
                .setHTML(`<h3>${name}</h3>`);
                marker.setPopup(popup);
                // .setPopup(new mapboxgl.Popup().setText(name)
                
        });
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
            })
        );

        addMarkers(); // Invoke addMarkers here to add the markers when the map is initialized
    });

    const moveMap = (lat, lng) => {
        if (!map.current) return;
        
        map.current.flyTo({
            center: [lat, lng],
            essential: true,
        });
    };

    useEffect(() => {
        if (!map.current) return;
        
        map.current.on("move", () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <Navbar/>
        <div className="bg-gray-200 mt-8 ml-10 overflow-hidden">
            
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
            <input type="text" value={inpLat} onChange={(e) => setInpLat(e.target.value)} placeholder="Lat" className="border-2 mx-2 shadow-lg shadow-indigo-400/40 rounded-md h-8"/>
            <input type="text" value={inpLng} onChange={(e) => setInpLng(e.target.value)} placeholder="Lng" className="border-2 mx-2 shadow-lg shadow-indigo-400/40 rounded-md h-8"/>
            <button
                label="Submit"
                onClick={(e) => {
                    e.preventDefault();
                    setLat(inpLat);
                    setLng(inpLng);
                    moveMap(inpLng, inpLat);
                }}
                className="m-2 mb-2 bg-indigo-300 w-24 hover:bg-indigo-400 h-8 rounded-lg"
            >Submit</button>
            <div id="map" ref={mapContainer} className="w-full h-[450px] mt-10 relative"></div>
        </div>
        </div>
    );
};
export default Maps