import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Alert from './components/Alert'

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alert_message, setAlertMessage] = useState("");
  const [alert_class_name, setAlertClassName] = useState("d-none");
  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
      console.log('location', location.pathname);
      // Fire whatever function you need.
      setAlertClassName("d-none");
  }, [location.pathname]);

  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch(`/logout`, requestOptions)
      .catch(error => {
        console.log("error logging out", error);
      })
      .finally(() => {
        setAlertClassName("d-none");
        setJwtToken("")
        toggleRefresh(false);
      })
    
    navigate("/login");
  }

  const toggleRefresh = useCallback((status) => {
    console.log("clicked");

    if (status) {
      console.log("turning on ticking");
      let i = setInterval(() => {
        
        const requestOptions = {
          method: "GET",        
          credentials: "include",
        }
        
        fetch(`/refresh`, requestOptions)
        .then((response)=> response.json())
        .then((data) => {
            if (data.access_token) {
                setJwtToken(data.access_token);
            } 
        })
        .catch(error => {
            console.log("user is not logged in");
        })
      }, 600000);
      setTickInterval(i);
      console.log("setting tick interval to", i);
    } 
    else {
      
      console.log("turning off ticking");
      console.log("turning off tickInterval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",        
        credentials: "include",
      }

      fetch(`/refresh`, requestOptions)
        .then((response)=> response.json())
        .then((data) => {
            if (data.access_token) {
                setJwtToken(data.access_token);
                toggleRefresh(true);
            } 
        })
        .catch(error => {
            console.log("user is not logged in", error);
        })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>Scoir Code Challenge</h1>
        </div>
        <div className="col text-end">
          {jwtToken === ""
            ? <Link to="/login"><span className="badge bg-success">Login</span></Link>
            : <>
                <p>You are logged in</p>
                <a href="#!" onClick={logOut}><span className="badge bg-danger">Logout</span></a>                 
              </>
              
          }
        </div>
        <hr className="md-3"/>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">Home</Link>              
              {jwtToken !== "" &&
                <>
                  <Link to="/user/profile" className="list-group-item list-group-item-action">Profile</Link>
                </>
              }
            </div>
          </nav>
        </div>
        <div className="col-md-10">         
          <Alert
            message={alert_message}
            className={alert_class_name}
          />
          <Outlet context={{
            jwtToken: jwtToken,
            setJwtToken,
            setAlertClassName,
            setAlertMessage,
            toggleRefresh
          }} />
        </div>
      </div>
    </div>
  );
}

export default App;
