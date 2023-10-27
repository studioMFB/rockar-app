import { AbstractDataSource } from "./abstract";
import { CsvAdaptor } from "./csv";
import { DbAdaptor } from "./db";


export class DataAdaptorFactory {

    static createDataAdaptor(): AbstractDataSource {
        switch (process.env.DATA_SOURCE) {
            case "db":
                return new DbAdaptor();
            case "csv":
            default:
                return new CsvAdaptor();
        }
    }
}

