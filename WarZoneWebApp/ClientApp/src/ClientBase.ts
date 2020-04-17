import { useContext } from 'react';


export class ClientBase {
    protected transformOptions(options: RequestInit) {

        // kbytner 25.01.2019 -- jak już będziemy przechowywać access_token to odkomentować i zaimplementować
        // if (user) {
        //     const token = user.access_token;
        //     options.headers!["Authorization"] = [`Bearer ${token}`];
        // }

        return Promise.resolve(options);
    }

    protected transformResult(url: string, response: Response, processor: (response: Response) => any) {
        return processor(response);
    }

}