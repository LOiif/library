import {createBrowserRouter} from 'react-router-dom';
import App from "../App";
import MainPage from "../pages/MainPage/MainPage";
import BookDetails from "../pages/BookDetails/BookDetails";

export const router = createBrowserRouter([
    {path: '/', element: <App/>},
    {path:'catalog', element: <MainPage/>},
    {path:'book/:id', element: <BookDetails/>},
    {path:'book', element: <BookDetails/>},
]
)
