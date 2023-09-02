
import React, { useRef, useEffect, useState } from 'react';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface SelectMapIntrface{
  value: any
}

const SelectMap: React.FC<SelectMapIntrface> = ({value}) => {

  // const mapRef = useRef<undefined>();
  const initialViewState = {
    latitude: value[0],
    longitude: value[1],
    zoom: 5,
  };

  // useEffect(() => {
    
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(function(position) {
  //         setViewport({
  //           ...viewport,
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       }, function(error) {
  //         console.error("Error getting location: " + error.message);
  //       });
  //     } else {
  //       console.error("Geolocation is not available in this browser.");
  //     }
    
    
  // }, []);

  // useEffect(()=>{
  //   if(value){
  //     setLatitude(value.lat);
  //     setLongitude(value.lng);
  //   }
  //   setViewport({
  //     ...viewport,
  //     latitude: latitude,
  //     longitude: longitude,
  //   });
  // },[value])
  
  // useEffect(()=>{
  //   if(onChange){
  //   onChange({"lng": viewport.longitude, "lat": viewport.latitude})}
  // },[viewport])

  return (
    <div className='h-full  w-full'>
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1IjoiaW1yYW4xOTU2IiwiYSI6ImNsa3h0ajViOTAwaWEzbW5wdmY4M2M0OWIifQ.I423Zm6aT0dFSw-ocswIdQ"
        initialViewState={initialViewState}
        doubleClickZoom
        style={{ borderRadius: 6, padding: 6, minHeight: 300}}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={initialViewState.latitude}
          longitude={initialViewState.longitude}
         
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
        />
        {/* {showSearch && <Geocoder setViewport={setViewport} viewport={viewport} />} */}
      </ReactMapGL>
      
    </div>
  )
}

export default SelectMap