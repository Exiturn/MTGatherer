import React from "react";

const ProfilePage = ({
  user,
}: {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
}) => {
  return (
    <div>
      {user?.name}
      <img className="rounded-full h-20 w-20" src={user?.image} alt="Profile Picture" />
      <button>
        <a href="/">Home</a>
      </button>
    </div>
  );
};

export default ProfilePage;
