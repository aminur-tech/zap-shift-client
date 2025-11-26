import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Coverage/Coverage";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import PrivateRoutes from "./PrivateRoutes";
import AddParcel from "../Pages/AddParcel/AddParcel";
import Dashboard from "../Layouts/Dashboard";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import Rider from "../Pages/Rider/Rider";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders";
import UserManagement from "../Pages/Dashboard/UserManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/coverage',
                Component: Coverage,
                loader: () => fetch('/ServicesArea.json')
            },
            {
                path: '/rider',
                element:
                    <PrivateRoutes>
                        <Rider></Rider>
                    </PrivateRoutes>,
                loader: () => fetch('/ServicesArea.json')
            },
            {
                path: '/addParcel',
                element:
                    <PrivateRoutes>
                        <AddParcel></AddParcel>
                    </PrivateRoutes>,
                loader: () => fetch('/ServicesArea.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        element:
            <PrivateRoutes>
                <Dashboard></Dashboard>
            </PrivateRoutes>,
        children: [
            {
                path: 'my-parcels',
                Component: MyParcels
            },
            {
                path: 'payment/:id',
                Component: Payment
            },

            {
                path: 'payment-history',
                Component: PaymentHistory
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess
            },
            {
                path: 'payment-cancel',
                Component: PaymentCancel
            },
            {
                path: 'approve-riders',
                element: 
                <AdminRoute>
                    <ApproveRiders></ApproveRiders>
                </AdminRoute>
            },
            {
                path: 'user-management',
                element: 
                <AdminRoute>
                    <UserManagement></UserManagement>
                </AdminRoute>
            },
            {
                path:'assign-riders',
                element: 
                <AdminRoute>
                    <AssignRiders></AssignRiders>
                </AdminRoute>
            }
        ]
    }
]);
