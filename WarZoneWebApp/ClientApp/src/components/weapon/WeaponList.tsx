import React, { useEffect, useState } from 'react';
import WeaponPanel from './WeaponPanel';
import { IWeapon, OfferClient } from '../../ApiClient';

const WeaponList: React.FunctionComponent = props => {
    const [weapons, setWeapons] = useState<IWeapon[] | null>([]);

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
                {weapons && weapons.map((e) => {
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