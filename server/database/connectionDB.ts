import {Pool, PoolClient, QueryResult} from 'pg'
import {ExtractionCredentials} from '../configs/dotenv/extractCredentials/extractionCredentials'

export class ConnectionDB extends ExtractionCredentials {
    
    connection: Pool
    
    constructor(){
        super()

        this.connection = new Pool ({
            user: this.extractionCredentials()?.username || '',
            password: this.extractionCredentials()?.password || '',
            port: this.extractionCredentials()?.port || 0,
            host: this.extractionCredentials()?.host || '',
            database: this.extractionCredentials()?.database || ''
        })

    }

    public async modelConnection(): Promise<PoolClient | undefined>{
        try {
            return await this.connection.connect()
        } catch (error) {
            console.error('Erro ao instanciar o modelo de conexão: ', error)
        }
    }

    public async modelDisconect(): Promise<void> {
        try {
            await this.connection.end()
        } catch (error) {
            console.error('Erro ao instancia o modelo de disconexão: ', error)
        }
    }

    public async modelQuery(SQLCommand: string, values: any): Promise<any> {
        let client: PoolClient | undefined;
        try {
            client = await this.connection.connect(); 
            const result = await client.query(SQLCommand, values);
            return result.rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
            throw error; 
        } finally {
            client?.release(); 
        }
    }

    public async modelQueryUnic(SQLCommand: string): Promise<any> {
        let client: PoolClient | undefined;
        try {
            client = await this.connection.connect(); 
            const result = await client.query(SQLCommand);
            return result.rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
            throw error; 
        } finally {
            client?.release(); 
        }
    }
}