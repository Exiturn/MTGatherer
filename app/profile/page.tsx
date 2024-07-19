import React from "react";
import { SessionUserT } from "@/types";
import { auth } from "@/auth/auth";
import ProfilePage from "@/components/ProfilePage";

const Profile = async () => {
  const session = await auth();
  return (
    <div>
      <pre>Profile Page: {JSON.stringify(session?.user, null, 2)}</pre>
      <ProfilePage user={session?.user as SessionUserT} />
    </div>
  );
};

export default Profile;
