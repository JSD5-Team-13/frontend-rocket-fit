import NavbarLoggedIn from "./NavbarLoggedIn.jsx"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

    return (
        <div>
            <NavbarLoggedIn /> 
            {children}
        </div>
    )
} 


export default Layout;