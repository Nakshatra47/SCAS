import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import mapboxgl from "!mapbox-gl";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTaxi } from '@fortawesome/free-solid-svg-icons';
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
 
mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA";

const addCoordinates = (map, coordinates, options = {}) => {
  const marker = new mapboxgl.Marker(options)
    .setLngLat(coordinates)
    .addTo(map);
};

const Map = (props) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: props.pickup.length !== 0 ? props.pickup : [75.8366318, 25.1389012],
      zoom: props.pickup.length !== 0 ? 12 : 5,
    });

    map.on('load', () => {
      try {
        if (props.pickup.length !== 0 && props.dropoff.length !== 0) {
          const directions = new MapboxDirections({
            accessToken: mapboxgl.accessToken,
            unit: "metric",
            profile: "mapbox/driving",
          });
          
          directions.on('error', (error) => {
            console.error('Mapbox Directions Error:', error);
          });
          
          map.addControl(directions, "top-left");
          directions.setOrigin(props.pickup);
          directions.setDestination(props.dropoff);
        

        }
      } catch (error) {
        console.error('Error initializing MapboxDirections:', error);
      }

      // Add marker at pickup location
      if (props.pickup.length !== 0) {
        addCoordinates(map, props.pickup);
		const boundingBox = [
			[props.pickup[0] - 0.005, props.pickup[1] - 0.005],
			[props.pickup[0] + 0.005, props.pickup[1] + 0.005]
		  ];
	
		  map.fitBounds(boundingBox, {
			padding: 60,
		  });
      }

      // Generate and mark five random cab positions
      if (props.cabCoordinates && props.cabCoordinates.length > 0) {
        // Generate and mark five random cab positions
        props.cabCoordinates.forEach((cabPosition, index) => {
          addCabMarker(map, cabPosition);
        });
      }
      // Add marker at dropoff location
      if (props.dropoff.length !== 0) {
        addCoordinates(map, props.dropoff, { color: "blue" }); // Customize the dropoff marker
      }
    });

  }, [props.pickup, props.dropoff, props.cabCoordinates]);

  const addCabMarker = (map, coordinates) => {
    // Save the generated coordinates
    //addCoordinates(map, coordinates, { color: "red" });
    const cabMarker = document.createElement('div');
    cabMarker.className = 'cab-marker';
    
    // Customize the cab marker with a taxi icon using FontAwesome
    ReactDOM.render(<FontAwesomeIcon icon={faTaxi} style={{ fontSize: '30px', color: 'red' }} />, cabMarker);

    // Save the generated coordinates
    addCoordinates(map, coordinates, { element: cabMarker });
  }; 

  return <Wrapper id="map"></Wrapper>; 
};

const Wrapper = tw.div`
  flex-1 h-1/2
`;

export default Map;

