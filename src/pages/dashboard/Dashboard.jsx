import { useContext } from "react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";

import QuickActions from "../../components/dashboard/QuickActions";
import StatisticsCards from "../../components/dashboard/StatisticsCards";
import RecentActivity from "../../components/dashboard/RecentActivity";

import { OrganizationContext } from "../../context/OrganizationContext";
import { DeploymentContext } from "../../context/DeploymentContext";


function Dashboard(){


    const { organizations } =
        useContext(OrganizationContext);


    const { deployments } =
        useContext(DeploymentContext);



    return (

        <section className="dashboard">


            <DashboardHeader />


            <QuickActions />



            <StatisticsCards

                organizationsCount={
                    organizations.length
                }

                computersCount={
                    deployments.length
                }

                successfulDeployments={
                    deployments.filter(
                        (deployment)=>
                            deployment.status === "Successful"
                    ).length
                }

            />



            <RecentActivity

                deployments={
                    deployments
                }

            />


        </section>

    );

}


export default Dashboard;