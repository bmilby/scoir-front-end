import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    let { id } = useParams();

    useEffect(() => {
        let myProfile = {
            email: "admin@example.com",
            firstName: "Admin",
            lastName: "User",
        }
        setUserInfo(myProfile);

    }, [id]);

    return (
        <div>
            <h2>Profile</h2>
            <p>First Name: {userInfo.firstName}</p>
            <p>Last Name: {userInfo.lastName}</p>
            <p>Email: {userInfo.email}</p>
        </div>
    )
}

export default Profile;