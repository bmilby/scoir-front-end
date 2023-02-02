import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Profile = () => {
    const [userInfo, setUserInfo] = useState({});
    const {jwtToken} = useOutletContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/login");
            return
        }
        let myProfile = {
            email: "admin@example.com",
            firstName: "Admin",
            lastName: "User",
        }
        setUserInfo(myProfile);

    }, [jwtToken, navigate]);

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