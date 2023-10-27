

export abstract class AbstractDataSource {

    abstract read<T>(filename: string, identifer: any): Promise<T[] | null>;

    abstract write<T>(filename: string, data: any, identifer: any): Promise<void>;
}