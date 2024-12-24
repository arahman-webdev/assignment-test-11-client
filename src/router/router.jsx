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
                element: <AddCarForm></AddCarForm>
            },
            {
                path: '/my-cars',
                element: <MyCars></MyCars>,

            },
            {
                path: '/my-booking',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/manage-car',
                element: <ManageCar></ManageCar>
            },
            {
                path: '/available-cars',
                element: <AvailableCar></AvailableCar>,
                loader: () => fetch('http://localhost:5000/cars')
            },
            {
                path: '/update/:id',
                element: <UpdateCar></UpdateCar>,
                loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.id}`)
            },
            {
                path: '/detail/:id',
                element: <CarDetail></CarDetail>,
                loader: ({ params }) => fetch(`http://localhost:5000/cars/${params.id}`)
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