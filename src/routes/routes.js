import { createBrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { Results } from "../components/Results";
import { Register } from "../components/Register";
import { CreateDestination } from "../components/CreateDestination";
import { Home } from "../components/Home";
import { EditDestination } from "../components/EditDestination";

export const router = createBrowserRouter([
        {
            path: "/",
            Component: Home
        },
        {
            path: "/login",
            Component: Login
        },
        {
            path: "/register",
            Component: Register
        },
        {
            path: "/results",
            Component: Results
        },
        {
            path: "/create-destination",
            Component: CreateDestination
        },
        {
            path: "/edit-destination/:id",
            Component: EditDestination
        },
    ], {
        basename: '/turismoblog', // Asegúrate de poner el nombre de tu repositorio aquí
    });