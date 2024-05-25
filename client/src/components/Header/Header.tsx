import React, {useEffect, useState} from 'react';
import './Header.scss';
import {ReactComponent as FavouritesIcon} from "../../images/favourites.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as SearchIcon} from "../../images/search.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {store} from "../../index";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [focus, setFocus] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const searchBlurHandler = (e) => {
        console.log(e.target)
        setFocus(false)
    }
    const searchFocusHandler = (e) => {
        setFocus(true)
    }
    const searchClickHandler = (e) => {
        console.log(focus)
        // setFocus(true)
    }
    const handleKeyPress = (event) => {
        console.log(location.pathname)
        if (event.key === 'Enter') {
            navigate("/catalog", {state: {searchQuery}})
        }
    };

    return (
        <header className="header">
            <div>
                <nav className="nav">
                    <div className="nav-links">
                        <Link to={`/`} className={'logo nav-link'}>easy-lib</Link>
                        <Link to={`/`} className={'nav-link'}>Главная</Link>
                        <Link to={`/catalog`} className={'nav-link'}>Каталог</Link>
                        <Link to={`/`} className={'nav-link'}>Топы</Link>
                    </div>

                    <div className="profile-links">

                        {
                            location.pathname !== "/catalog" ?
                        <div className="profile-nav-item profile-icon">
                            <input className={'search-input'}
                                   onFocus={searchFocusHandler}
                                   onKeyUp={handleKeyPress}
                                   type="text"
                                   id="search"
                                   onChange={(e) => setSearchQuery(e.target.value)}
                                   value={searchQuery}
                            />
                            <label className="search-label" htmlFor="search" onBlur={searchBlurHandler}>

                                {
                                    !focus ?
                                        <div onClick={searchClickHandler} className="icon icon-search"><SearchIcon/>
                                        </div>
                                        : <Link to={`/catalog`} className={'icon icon-search'} state={{searchQuery}}><SearchIcon/></Link>
                                }

                                Поиск книг
                            </label>
                        </div>
                                : <></>
                        }
                        <Link to={'/profile'} state={{displayed: 'favourites'}} className="profile-nav-item profile-icon">
                            <i className="icon icon-favourites"><FavouritesIcon/></i>
                            Избранное
                        </Link>
                        {
                            store.isAuth
                                ? <Link to={'/profile'} state={{displayed: 'mainInfo'}} className="profile-nav-item profile-icon">
                                    <i className="icon icon-profile"><ProfileIcon/></i>
                                    Профиль
                                </Link>
                                : <Link to={`/login`} className={'profile-nav-item login-button'}>Войти</Link>
                        }

                    </div>
                </nav>
            </div>
        </header>
    );
};

export default observer(Header);