import React from 'react';
import { Card, Typography } from 'antd';
import { IWeapon } from '../../ApiClient';

interface IWeaponPanelProps {
    weapon: IWeapon;
}
const WeaponPanel: React.FunctionComponent<IWeaponPanelProps> = props => {
    return (
        <Card
            style={{
                width: 200,
                minWidth: 200,
                height: 360,
                border: "none",
                padding: 2
            }}
            title={
                <Typography.Text ellipsis style={{ color: "black" }} >
                    {props.weapon.weaponName}
                </Typography.Text>
            }
            cover={<img
                style={{
                    width: 200,
                    height: 305,

                }}
                alt="Poster"
                src={`images/weapons/${props.weapon.weaponName}.png`}
            />}
        ></Card>
    );
};
export default WeaponPanel;
