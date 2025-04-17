import { useSelector } from "react-redux";

const Profile = () => {
  const { name, email, photoURL } = useSelector(state => state.userSlice);


  return (
    <div className="p-8">
      <h1 className="font-semibold text-3xl mb-4">Profile </h1>
      <div className="flex gap-4 items-center">
        <img className="rounded-full" src={photoURL} alt="" />
        <div>
          <p className="font-bold">{name}</p>
          <p>{email}</p>
        </div>
      </div>
    </div >
  );
};

export default Profile;
