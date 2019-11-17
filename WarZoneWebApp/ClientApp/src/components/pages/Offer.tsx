import React, { Component, useState, useEffect } from 'react';
import { Button, Form, Input, Icon } from 'antd';
import WeaponList from '../weapon/WeaponList';

function hasErrors(fieldsError: { [x: string]: any; }) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const Offer: React.FunctionComponent = props => {


    useEffect(() => {

    });

    return (
        <div>
            <WeaponList />
        </div>
    );

}
export default Offer;