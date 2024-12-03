import dotenv, { DotenvConfigOutput } from 'dotenv'

const config = {
    path: '/home/pedro.quaiato@intelidata.local/Área de Trabalho/Projeto-Dash/server/env/env.env',
    override: true

}

export class ConfidDotenv {
    constructor(){

        this.configsDotenv(config.path, config.override)
    }

    public configsDotenv(path: string, override: boolean): DotenvConfigOutput | undefined{
        try {
            return dotenv.config({path: path, override: override})
        } catch (error) {
            console.error('Erro ao instanciar as configurações do DOTENV: ', error)
        }
    }
}