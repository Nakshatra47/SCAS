// RideSelector.js
import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import { carList } from "../data/carList";

const RideSelector = ({ pickup, dropoff, cabCoordinates }) => {
  const [nearestCab, setNearestCab] = useState(null);
  const [minDistance, setMinDistance] = useState(Number.MAX_VALUE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	//console.log(pickup[0]);
	//console.log("cabCoordinates:", cabCoordinates);
    const findNearestCab = () => {
      if (!cabCoordinates || cabCoordinates.length === 0) {
        setNearestCab(null);
        return;
      }

	  let nearestCabIndex = -1;
	  let nearestDistance = Number.MAX_VALUE;
  
	  cabCoordinates.forEach((cabPosition, index) => {
		const distance = calculateDistance(pickup[1], pickup[0], cabPosition[1], cabPosition[0]);
  
		if (distance < nearestDistance) {
		  nearestDistance = distance;
		  nearestCabIndex = index;
		}
	  });
  
	  setMinDistance(nearestDistance);
	  setNearestCab(nearestCabIndex !== -1 ? nearestCabIndex : null);
	};
    findNearestCab();
    setLoading(false);
  }, [pickup, minDistance, cabCoordinates]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  const [rideDuration, setrideDuration] = useState(0);

  useEffect(() => {
	fetch(
	  `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${dropoff[0]},${dropoff[1]}?access_token=pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA`
	)
	  .then((res) => res.json())
	  .then((data) => {
		if (data.routes && data.routes.length > 0 && data.routes[0].duration) {
		  setrideDuration(data.routes[0].duration / 100);
		} else {
		  console.error("Invalid data format or missing duration property:", data);
		}
	  })
	  .catch((error) => {
		console.error("Error fetching route data:", error);
	  });
  }, [pickup, dropoff]);
  

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };
console.log("Invalid cabCoordinates:",nearestCab);
console.log(minDistance);
  return (
    <Wrapper>
      <Title>Choose a ride, or swipe up for more</Title>
      {loading ? (
        <LoadingIndicator>Loading...</LoadingIndicator>
      ) : (
        <NearestCab>
          {nearestCab!==null ? (
            <>
              <Car key={carList[nearestCab].id}>
                <CarImg src={carList[nearestCab].imgUrl} />
                <CarDetails>
                  <CarName>{carList[nearestCab].service}</CarName>
                  <Time> ETA: {parseFloat( minDistance * 7).toFixed(1)} Mins</Time>
                </CarDetails>
                <CarPrice>₹ {parseFloat(7 * rideDuration).toFixed(2)}</CarPrice>
              </Car>
              <p>Nearest Cab</p>
			</>
          ) : (
            <p>No cabs available</p>
          )}
        </NearestCab>
      )}
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;
const Title = tw.div`
  text-xs text-center text-gray-600 py-2 border-b
`;
const NearestCab = tw.div`
  flex p-4 items-center
`;
const Car = tw.div`
  flex p-4 items-center
`;
const CarImg = tw.img`
  h-14 mr-3
`;
const CarDetails = tw.div`
  flex-1
`;
const CarName = tw.div`
  font-medium
`;
const Time = tw.div`
  text-xs text-blue-600
`;
const CarPrice = tw.div`
  font-medium text-sm
`;
const LoadingIndicator = tw.div`
  text-center text-gray-600 py-4
`;
