import {createBrowserRouter} from 'react-router-dom';
import App from "../App";
import MainPage from "../pages/MainPage/MainPage";
import BookDetails from "../pages/BookDetails/BookDetails";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import MachinesPage from "../pages/MachinesPage/MachinesPage";
import MachineDetailPage from "../pages/MachineDetailPage/MachineDetailPage";

export const router = createBrowserRouter([
        {path: '/', element: <App/>},
        {path: 'catalog', element: <CatalogPage/>},
        {path: 'book/:id', element: <BookDetails/>},
        {path: 'book', element: <BookDetails/>},
        {path: 'registration', element: <RegistrationPage/>},
        {path: 'login', element: <LoginPage/>},
        {path: 'profile', element: <ProfilePage/>},
        {path: 'machines', element: <MachinesPage/>},
        {path: 'machines/:doc', element: <MachineDetailPage/>},
    ]
)
