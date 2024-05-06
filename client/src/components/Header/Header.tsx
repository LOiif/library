import React from 'react';
import './Header.scss';
import {ReactComponent as FavouritesIcon} from "../../images/favourites.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as SearchIcon} from "../../images/search.svg";
import {Link} from "react-router-dom";

const Header = () => {
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
                            <input className="search-input" type="text" id="search"/>
                            <label className="search-label" htmlFor="search">
                                <i className="icon icon-search"><SearchIcon/></i>
                                Поиск книг
                            </label>
                        </div>
                        <a className="profile-nav-item profile-icon" href="src/components">
                            <i className="icon icon-favourites"><FavouritesIcon/></i>
                            Избранное
                        </a>
                        <a className="profile-nav-item profile-icon" href="src/components">
                            <i className="icon icon-profile"><ProfileIcon/></i>
                            Профиль
                        </a>
                        <a className="profile-nav-item login-button" href="src/components">Войти</a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;