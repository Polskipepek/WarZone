import React, { useState, useEffect } from "react";
import { ICustomer, CustomerClient } from "./ApiClient";

export const [customers, setCustomers] = useState<ICustomer[]>([]);

const CustomerList: React.FunctionComponent = props => {

    const GetCustomers = () => {
        new CustomerClient().getCustomers().then(e => {
            console.log("premise:");
            setCustomers(e);
        });
    }

    useEffect(() => {
        if (customers !== [])
            GetCustomers();
    }, []);

    return (
        <div>

        </div>
    );

}
export default CustomerList;