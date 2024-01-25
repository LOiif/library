import React from 'react';
import './Header.scss';
import {ReactComponent as FavouritesIcon} from "../../images/favourites.svg";
import {ReactComponent as ProfileIcon} from "../../images/profile.svg";
import {ReactComponent as SearchIcon} from "../../images/search.svg";

const Header = () => {
    return (
        <header className="header">
            <div>
                <nav className="nav">
                    <div className="nav-links">
                        <a className="logo nav-link" href="src/components#">easy-lab</a>
                        <a className="nav-link" href="src/components">Главная</a>
                        <a className="nav-link" href="src/components">Каталог</a>
                        <a className="nav-link" href="src/components">Топы</a>
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