import React, {useEffect, useState} from 'react';
import './Header.scss';
import {ReactComponent as FavouritesIcon} from "../../images/favourites.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as SearchIcon} from "../../images/search.svg";
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {store} from "../../index";

const Header = () => {
    const [searchValue, setSearchValue] = useState('')
    const [focus, setFocus] = useState(false)
    const navigate = useNavigate()

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

    return (
        <header className="header">
            <div>
                <nav className="nav">
                    <div className="nav-links">
                        <Link to={`/`} className={'logo nav-link'}>easy-lab</Link>
                        <Link to={`/`} className={'nav-link'}>Главная</Link>
                        <Link to={`/`} className={'nav-link'}>Каталог</Link>
                        <Link to={`/`} className={'nav-link'}>Топы</Link>
                    </div>

                    <div className="profile-links">
                        <div className="profile-nav-item profile-icon">
                            <input className={'search-input'}

                                   onFocus={searchFocusHandler}
                                   type="text"
                                   id="search"
                                   onChange={(e) => setSearchValue(e.target.value)}
                                   value={searchValue}
                            />
                            <label className="search-label" htmlFor="search" onBlur={searchBlurHandler}>

                                {
                                    !focus ?
                                        <div onClick={searchClickHandler} className="icon icon-search"><SearchIcon/>
                                        </div>
                                        : <Link to={`/catalog`} className={'icon icon-search'}><SearchIcon/></Link>
                                }


                                Поиск книг
                            </label>
                        </div>
                        <a className="profile-nav-item profile-icon" href="src/components">
                            <i className="icon icon-favourites"><FavouritesIcon/></i>
                            Избранное
                        </a>
                        {
                            store.isAuth
                                ? <Link to={'/login'} className="profile-nav-item profile-icon">
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