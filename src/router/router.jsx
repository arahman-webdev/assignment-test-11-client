import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/AuthUser/Login";
import Register from "../Pages/AuthUser/Register";

import MyCars from "../Pages/MyCars";
import AvailableCar from "../Pages/AvailableCar";

import AddCarForm from "../Pages/AddCar";
import UpdateCar from "./PrivateLayout/UpdateCar";
import CarDetail from "./PrivateLayout/CarDetail";
import ManageCar from "./PrivateLayout/ManageCar";
import MyBooking from "./PrivateLayout/MyBooking";
import PrivateLayout from "./PrivateLayout/PrivateLayout";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <h2 className="text-7x text-center">404</h2>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-car',
                element: <PrivateLayout><AddCarForm></AddCarForm></PrivateLayout>
            },
            {
                path: '/my-cars',
                element: <PrivateLayout><MyCars></MyCars></PrivateLayout>,

            },
            {
                path: '/my-booking',
                element: <PrivateLayout><MyBooking></MyBooking></PrivateLayout>
            },
            {
                path: '/manage-car',
                element: <PrivateLayout><ManageCar></ManageCar></PrivateLayout>
            },
            {
                path: '/available-cars',
                element: <AvailableCar></AvailableCar>,
                loader: () => fetch('https://assignment-test-11-server.vercel.app/cars')
            },
            {
                path: '/update/:id',
                element: <PrivateLayout><UpdateCar></UpdateCar>,</PrivateLayout>,
                loader: ({ params }) => fetch(`https://assignment-test-11-server.vercel.app/cars/${params.id}`)
            },
            {
                path: '/detail/:id',
                element: <CarDetail></CarDetail>,
                loader: ({ params }) => fetch(`https://assignment-test-11-server.vercel.app/cars/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])

export default router