import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getMenu} from "../../redux-store/menuSlice";
import Logo from "../../assets/logo.png";

import './Menu.css'
import {Link, useNavigate} from "react-router-dom";
const AppMenu = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuItems = useSelector((state) => state.menu.items);
    const menuStatus = useSelector((state) => state.menu.status);


    useEffect(() => {
        if (menuStatus === 'idle') {
            dispatch(getMenu());
        }
    }, []);

    const items = menuItems.map((item) => {

        const childrenItems = item.Kategorije ? item.Kategorije.map((child) => ({
            label: <span className="custom-menu-item">{child.Naziv}</span>,
            key: `${item.Naziv}-${child.roditeljID}-${child.meniID}-${child.Naziv}`,
        })) : [];

        if (childrenItems.length > 0) {
            return {
                label: item.Naziv,
                key: item.meniID,
                children: [
                    {
                        label: item.Naziv,
                        key: `${item.meniID}-${item.Naziv}`,
                    },
                    ...childrenItems,
                ],
            };
        }

    });
    const onClick = (e) => {
        const parts = e.key.split('-');
        if (parts.length === 2) {
            const [meniId, Naziv] = parts;
            const foramattedNaziv = Naziv.trim().toLowerCase().replace(/ /g, '-');
            navigate(`/${foramattedNaziv}`, { state: { meniId }});
        }
        else
        {
            const [Naziv,meniId,childId,ChildNaziv] = parts;
            const foramattedNaziv = Naziv.trim().toLowerCase().replace(/ /g, '-');
            const foramattedNazivChild = ChildNaziv.trim().toLowerCase().replace(/ /g, '-');
            navigate(`/${foramattedNaziv}/${foramattedNazivChild}`, { state: { childId, meniId }});
        }

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
            <Menu className="menu-color" onClick={onClick} mode="horizontal" items={items}/>
        </div>
    );
}

export default AppMenu;