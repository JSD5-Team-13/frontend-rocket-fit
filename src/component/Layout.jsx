import NavbarLoggedIn from "./navbar/NavbarLoggedIn.jsx"

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {

    return (
        <div className="flex-col justify-center">
            <div className="fixed top-0">
              <NavbarLoggedIn />   
            </div>
            <div className="mx-auto mt-[5rem]">
              {children}  
            </div>
        </div>
    )
} 


export default Layout;