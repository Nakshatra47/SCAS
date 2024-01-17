import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import tw from "tailwind-styled-components";
import Map from "../components/Map";
import Link from "next/link";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import img from "../images/exit.png";

export default function Home() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser({
					name: user.displayName,
					photoURL: user.photoURL,
				});
			} else {
				setUser(null);
				router.push("/login");
			}
		});
	}, []);

	return (
		<Wrapper>
			<Map pickup={[]} dropoff={[]} />
			<ActionItems>
				<Header>
					{/* <UberLogo src="https://i.ibb.co/84stgjq/uber-technologies-new-20218114.jpg" /> */}
					<Profile>
						<Name>{user && user.name}</Name>
						<UserImg src={user && user.photoURL} />
						<LogoutDiv>
							<LogoutImg src={img.src} onClick={() => signOut(auth)} />
						</LogoutDiv>
					</Profile>
				</Header>
				<ActionButtons>
					<Link href="/search">
						<ActionButton>
							<ActionButtonImg src="https://i.ibb.co/cyvcpfF/uberx.png" />
							Ride
						</ActionButton>
					</Link>
					<ActionButton>
						<ActionButtonImg src="https://i.ibb.co/n776JLm/bike.png" />
						Wheels
					</ActionButton>
					<ActionButton>
						<ActionButtonImg src="https://i.ibb.co/5RjchBg/uberschedule.png" />
						Reserve
					</ActionButton>
				</ActionButtons>
				<InputButton>Where to?</InputButton>
			</ActionItems>
		</Wrapper>
	);
}

const Wrapper = tw.div`
  flex flex-col h-screen
`;
const ActionItems = tw.div`
  flex-1 p-4
`;
const Header = tw.div`
  flex justify-between items-center
`;
const UberLogo = tw.img`
  h-28
`;
const Profile = tw.div`
  flex justify-between items-center
`;
const Name = tw.div`
  mr-4 text-sm
`;
const LogoutDiv = tw.div`
  flex ml-2 p-1 items-center justify-center rounded-full h-12 w-12 border border-gray-400
`;
const UserImg = tw.img`
  h-12 w-12 rounded-full border border-gray-400 p-px
`;
const LogoutImg = tw.img`
  h-8 w-auto object-contain cursor-pointer
`;
const ActionButtons = tw.div`
  flex justify-between
`;
const ActionButton = tw.div`
  flex bg-gray-200 flex-1 m-1 h-32 items-center flex-col justify-center rounded-lg transform hover:scale-105 hover:bg-gray-300 transition text-xl cursor-pointer
`;
const ActionButtonImg = tw.img`
  h-3/5
`;
const InputButton = tw.div`
  flex h-20 bg-gray-200 text-2xl items-center justify-center rounded-lg m-1 p-4 mt-8 transform hover:bg-gray-300 transition cursor-pointer
`;
