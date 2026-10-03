import Headers from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) =>{
    return (
        <>

            <Headers />
                 <div className="container mt-4">
                    {children}
                 </div>
            <Footer />
        </>
    )
}

export default Layout