import {ConfidDotenv} from '../configs/configsDotenv'

interface Credentials {
    username: string | undefined
    password: string | undefined
    database: string | undefined
    host: string | undefined
    port: number | undefined
}

export class ExtractionCredentials extends ConfidDotenv {
    constructor(){
        super()

    }

    public extractionCredentials(): Credentials | undefined{
        try {
            const Credentials: Credentials = {
                username: process.env.USERGNIO,
                password: process.env.PASSWORDGNIO,
                database: process.env.DATABASEDASHBOARD,
                host: process.env.HOSTGNIO,
                port: Number(process.env.PORTGNIO)
            }
            
            return Credentials

            
        } catch (error) {
            console.error('Erro ao realizar as extrações das credencias')
        }
    }
}