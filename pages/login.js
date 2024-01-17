import React, { useEffect } from "react";
import tw from "tailwind-styled-components";
import { useRouter } from "next/router";
import { app, auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";

const Login = () => {
	const router = useRouter();
	
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        router.push("/")
      }
    })
  }, []);

	return (
		<Wrapper>
			{/* <Logo src="https://i.ibb.co/ZMhy8ws/uber-logo.png" /> */}
			<Title>Log in to access your account</Title>
			<HeadImage src="https://i.ibb.co/CsV9RYZ/login-image.png" />
			<SignInButton onClick={() => signInWithPopup(auth, provider)}>
				Sign in with Google
			</SignInButton>
		</Wrapper>
	);
};

export default Login;

const Wrapper = tw.div`
  flex flex-col h-screen w-screen p-4 bg-gray-200
`;
const SignInButton = tw.button`
  bg-black text-white text-center py-4 rounded-lg mt-8 text-lg hover:bg-gray-900 transition
`;
const Logo = tw.img`
  h-20 w-auto object-contain self-start
`;
const Title = tw.div`
  text-5xl pt-4 text-gray-600
`;
const HeadImage = tw.img`
  object-contain w-full flex-1
`;
