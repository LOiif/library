import {createBrowserRouter} from 'react-router-dom';
import App from "../App";
import MainPage from "../pages/MainPage/MainPage";
import BookDetails from "../pages/BookDetails/BookDetails";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import CatalogPage from "../pages/CatalogPage/CatalogPage";

export const router = createBrowserRouter([
        {path: '/', element: <App/>},
        {path: 'catalog', element: <CatalogPage/>},
        {path: 'book/:id', element: <BookDetails/>},
        {path: 'book', element: <BookDetails/>},
        {path: 'registration', element: <RegistrationPage/>},
        {path: 'login', element: <LoginPage/>},
    ]
)
