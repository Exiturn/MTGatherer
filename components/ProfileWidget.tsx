import Image from "next/image";

type ProfileWidgetProps = {
  user: {
    name?: string;
    email?: string;
    image?: string;
  };
};

const ProfileWidget = (props: ProfileWidgetProps) => {
  const sessionUser = props.user;
  return (
    <div className="flex justify-center items-center">
      <a href="/profile">
        <img
          className="rounded-full h-10 w-10"
          src={sessionUser?.image}
          alt="Profile Picture"
        />
      </a>
    </div>
  );
};

export default ProfileWidget;
