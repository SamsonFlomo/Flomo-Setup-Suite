import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";


function MainLayout(){

    return (

        <div>


            <Sidebar />


            <main>


                <Header />


                <Outlet />


            </main>


        </div>

    );

}


export default MainLayout;