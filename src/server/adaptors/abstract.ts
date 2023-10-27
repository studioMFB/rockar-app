

export abstract class AbstractDataSource {

    abstract  read<T>(filename: string, identifer: string): Promise<T[] | null>;

    abstract write<T>(filename: string, data: any, identifer: any): Promise<void>;
}