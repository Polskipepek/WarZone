import React, { useContext, useState } from 'react';
import { AppUserContext, IAppUserContext } from '../../App';
import { Card, Typography } from 'antd';
import { IWeapon } from '../../ApiClient';

interface IWeaponPanelProps {
    weapon: IWeapon;
}
const WeaponPanel: React.FunctionComponent<IWeaponPanelProps> = props => {

    const { appUserCtx } = useContext<IAppUserContext>(AppUserContext);

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
                    {/* {props.weapon.weaponName} */}
                    {appUserCtx!.token}
                </Typography.Text>
            }
            cover={
                <img
                    style={{
                        width: 200,
                        height: 305,

                    }}
                    alt="Poster"
                    src={`images/weapons/${props.weapon.weaponName}.png`}
                />
            }
        ></Card>
        /*       </List.Item> */
    );
};
export default WeaponPanel;
