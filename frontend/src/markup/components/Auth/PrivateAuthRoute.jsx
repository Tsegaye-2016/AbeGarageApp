import React,{useState,useEffect} from "react";
import { Navigate } from "react-router";
import getAuth from "../../../util/auth";

const PrivateAuthRoute = ({ roles, children }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() =>{
        // Retrive the login user from local storage
        const loggedInEmployee = getAuth();
        // console.log(loggedInEmployee);
        loggedInEmployee.then((response) =>{
            if (response.employeetoken){
                setIsLogged(true);
                if (roles && roles.length > 0 && roles.includes(response.employee_role)) {
                    setIsAuthorized(true);

                }
            }
            setIsChecked(true);
        })

    }, [roles]);

    if (isChecked){
        if (!isLogged) {
            return <Navigate to="/login" />;
        }
        if (!isAuthorized) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};
export default PrivateAuthRoute;