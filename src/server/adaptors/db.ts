import { ERROR_MSG_DB_CONNECT } from "../../constants/error";
import { AbstractDataSource } from "./abstract";


export class DbAdaptor extends AbstractDataSource {
    async read<T>(filename: string, identifer: string): Promise<T[] | null> {
        // Data Source Specific Code
        /* To be implemented */

        throw new Error(ERROR_MSG_DB_CONNECT);
    }

    async write<T>(filename: string, data: any, identifer = false):Promise<void> {
        // Data Source Specific Code
        /* To be implemented */

        throw new Error(ERROR_MSG_DB_CONNECT);
    }
}
