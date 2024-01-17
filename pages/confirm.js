import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import RideSelector from "../components/RideSelector";
import { useRouter } from "next/router";
import Link from "next/link";

const Confirm = () => {
  const router = useRouter();
  const { pickupString, dropoffString } = router.query;
  const [cabCoordinates, setCabCoordinates] = useState([]);
  const [pickup, setPickup] = useState([0, 0]);
  const [dropoff, setDropoff] = useState([0, 0]);

  useEffect(() => {
    const getPickup = async (pickupString) => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickupString}.json?` +
            new URLSearchParams({
              access_token:
                "pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA",
              limit: 1,
            })
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pickup coordinates");
        }

        const data = await response.json();
        setPickup(data.features[0].center);
      } catch (error) {
        console.error("Error fetching pickup coordinates:", error);
      }
    };

    const getDropoff = async (dropoffString) => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoffString}.json?` +
            new URLSearchParams({
              access_token:
                "pk.eyJ1Ijoia2FyYW50eWFnaSIsImEiOiJja3ZxYzh2dmVhaHB1MzBzN2hraGYwdmE0In0.f9yixYME3J5FeeXpw-CLJA",
              limit: 1,
            })
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dropoff coordinates");
        }

        const data = await response.json();
        setDropoff(data.features[0].center);
      } catch (error) {
        console.error("Error fetching dropoff coordinates:", error);
      }
    };

    getPickup(pickupString);
    getDropoff(dropoffString);
  }, [pickupString, dropoffString]);

  const randomCabCoordinates = [];

  useEffect(() => {
    const generateCabCoordinates = () => {
      for (let i = 0; i < 5; i++) {
        const randomCabPosition = generateRandomPosition(pickup, 5);
        randomCabCoordinates.push(randomCabPosition);
      }
      setCabCoordinates(randomCabCoordinates);
    };

    generateCabCoordinates();
  }, [pickup]);

  const generateRandomPosition = (center, radius) => {
    const [lng, lat] = center;
    const randomAngle = Math.random() * 2 * Math.PI;
    const randomRadius = Math.random() * radius;

    const newLng = lng + randomRadius * Math.cos(randomAngle) / (111.32 * Math.cos(lat / 180 * Math.PI));
    const newLat = lat + randomRadius * Math.sin(randomAngle) / 111.32;

    return [newLng, newLat];
  };

  const handleConfirmRide = () => {
    // Add any logic needed before confirming the ride
    // For now, let's simply navigate to the confirmation page
    router.push("/confirmation");
  };

  return (
    <Wrapper>
      <BackButtonContainer>
        <Link href="/search">
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </BackButtonContainer>
      <Map pickup={pickup} dropoff={dropoff} cabCoordinates={cabCoordinates} />
      <RideContainer>
        <RideSelector pickup={pickup} dropoff={dropoff} cabCoordinates={cabCoordinates} />
        <ButtonContainer>
          <ConfirmButton onClick={handleConfirmRide}>Confirm Ride</ConfirmButton>
        </ButtonContainer>
      </RideContainer>
    </Wrapper>
  );
};

export default Confirm;

const Wrapper = tw.div`
  flex flex-col h-screen z-0
`;
const BackButtonContainer = tw.div`
  bg-white h-10 w-10 rounded-full absolute flex justify-center items-center z-10 ml-2 mt-2 shadow-md
`;
const BackButton = tw.img`
  cursor-pointer
`;
const RideContainer = tw.div`
  flex flex-1 flex-col h-1/3
`;

const ButtonContainer = tw.div`
  border-t-2  
`;

const ConfirmButton = tw.div`
  bg-black text-white my-4 mx-4 py-4 text-center text-lg rounded-lg cursor-pointer hover:bg-gray-900 transition
`;
