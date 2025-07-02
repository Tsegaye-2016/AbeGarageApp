//import react hooks and createContext from React
import React,{ useState, useEffect, createContext, useContext } from 'react';
//import the util function we created to handle the reading from localStorage
import getAuth from '../util/auth';
import { Children } from 'react';

// create context object
const AuthContext = React.createContext();

//create a custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
// create a provider component
 export const AuthProvider = ({ children })=>{
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [employee, setEmployee] = useState(null);

    const value = {
        isLogged,
        setIsLogged,
        isAdmin,
        setIsAdmin,
        employee,
        setEmployee
    };
    useEffect(()=>{
        const loggedInEmployee = getAuth();
        loggedInEmployee.then((response) =>{
            if(response.employeetoken){
                setIsLogged(true);
                if (response.employee_role === 3){
                    setIsAdmin(true);
                }
                setEmployee(response);
            }
        });
    },[]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}