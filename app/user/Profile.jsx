"use client";
import { useUserData } from "@/context/userDataContext";

const Profile = () => {
  const { userData } = useUserData();
  console.log(userData);
  return (
    <>
      <h1>Hello {userData?.username}</h1>
    </>
  );
};

export default Profile;
