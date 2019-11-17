import React, { useState, useEffect } from 'react'
import WeaponPanel from './WeaponPanel';
import { OfferClient, IWeapon } from '../../ApiClient';

const WeaponList: React.FunctionComponent = props => {
    const [weapons, setWeapons] = useState<IWeapon[]>([]);

    const GetWeapons = () => {
        new OfferClient().getWeapons().then(e => {
            console.log("premise:");
            setWeapons(e);
        });
    }

    useEffect(() => {
        if (weapons !== [])
            GetWeapons();
    }, []);

    return (
        <div>
            <ul className="grid-container">
                {weapons.map((e) => {
                    return (
                        <div id={e.id.toString()} className="grid-item">
                            <WeaponPanel weapon={e} />
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};
export default WeaponList;