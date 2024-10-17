import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getMenu} from "../../redux-store/menuSlice";
import Logo from "../../assets/logo.png";

import './Menu.css'
import {Link} from "react-router-dom";
const AppMenu = () => {

    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.menu.items);
    const menuStatus = useSelector((state) => state.menu.status);
    const [current, setCurrent] = useState('mail');

    useEffect(() => {
        if (menuStatus === 'idle') {
            dispatch(getMenu());
        }
    }, [dispatch, menuStatus]);

    const items = menuItems.map((item) => {

        const childrenItems = item.Kategorije ? item.Kategorije.map((child) => ({
            label: <span className="custom-menu-item">{child.Naziv}</span>,
            key: child.meniID,
        })) : [];

        if (childrenItems.length > 0) {
            return {
                label: item.Naziv,
                key: item.meniID,
                children: [
                    {
                        label: item.Naziv,
                        key: item.meniID,
                    },
                    ...childrenItems,
                ],
            };
        }

    });
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <div className="root-div">
            <div className="logo-map">
                <Link to="/">
                    <img className="app-logo" src={Logo} alt="Logo"/>
                </Link>
                <Link className="statistic-link" to="/">
                    Statistika
                </Link>
            </div>
            <Menu className="menu-color" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>
        </div>
    );
}

export default AppMenu;