import React from "react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth/auth";

const Profile = async () => {
  const session = await auth();
  return (
    <div className="">
      <pre>Profile Page: {JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Profile;
