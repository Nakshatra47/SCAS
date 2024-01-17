import React from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { useSpring, animated } from '@react-spring/web';

const Confirmation = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 500,
  });

  return (
    <Wrapper>
      <Container style={fadeIn}>
        <CheckIcon src="https://thumbs.dreamstime.com/b/tick-icon-vector-symbol-checkmark-isolated-white-background-checked-correct-choice-sign-check-mark-checkbox-picto-pictogram-127274496.jpg" />
        <Heading>Ride Confirmed!</Heading>
        <Message>Your ride has been confirmed successfully.</Message>
        <Link href="/search">
          <BackButton>Back to Search</BackButton>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default Confirmation;

const Wrapper = tw.div`
  flex items-center justify-center h-screen bg-gray-100
`;

const Container = tw(animated.div)`
  bg-white p-8 rounded-lg shadow-md text-center
`;

const CheckIcon = tw.img`
  w-16 h-16 mx-auto mb-4
`;

const Heading = tw.h1`
  text-3xl font-semibold text-gray-800
`;

const Message = tw.p`
  text-lg text-gray-600 mb-6
`;

const BackButton = tw.button`
  bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition
`;
