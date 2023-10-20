import NavbarLoggedIn from "./navbar/NavbarLoggedIn.jsx"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

    return (
        <div className="flex-col justify-center">
            <div className="mx-auto">
             <NavbarLoggedIn /> 
              {children}  
            </div>
        </div>
    )
} 


export default Layout;