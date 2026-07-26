import DashboardHeader from "../../components/dashboard/DashboardHeader";

import QuickActions from "../../components/dashboard/QuickActions";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import RecentActivity from "../../components/dashboard/RecentActivity";


function Dashboard(){

    return (

        <section className="dashboard">


            <DashboardHeader />


            <QuickActions />


            <StatisticsCards />


            <RecentActivity />


        </section>

    );

}


export default Dashboard;