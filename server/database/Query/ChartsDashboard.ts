import express, { Express } from 'express';
import { ConnectionDB } from '../../database/connectionDB';
import { IndexData } from '../../../data/indexData';
import { console } from 'inspector/promises';

interface DadosGerais {
    revendas: string[];
    contratosFaturados: number[];
    degustacoes: number[];
    recorrencia: number[];
    valorDegustacoes: number[];
    data: string[];
    categoria: string[];
    ativacoes: number[];
    cancelamentos: number[];
    saldo: number[];
}

export class QuerysDinamicas {
    connection: ConnectionDB;
    dataGraficos: IndexData;

    constructor(app: Express) {
        this.connection = new ConnectionDB();
        this.dataGraficos = new IndexData();
    }

    public async MontagemMain(permission: string, username: string) {
        try {
            let dadosGerais: DadosGerais = {
                revendas: [],
                contratosFaturados: [],
                degustacoes: [],
                recorrencia: [],
                valorDegustacoes: [],
                data: [],
                categoria: [],
                ativacoes: [],
                cancelamentos: [],
                saldo: []
            };

            if (permission === '1') {
                const SQLCommand = 'SELECT * FROM public."dadosGeral"';
                const result = await this.connection.modelQueryUnic(SQLCommand);

                result.forEach((item: any) => {
                    dadosGerais.revendas.push(item.revendas);
                    dadosGerais.contratosFaturados.push(item.contratos_faturados);
                    dadosGerais.degustacoes.push(item.degustacoes);
                    dadosGerais.recorrencia.push(item.recorrencia);
                    dadosGerais.valorDegustacoes.push(item.valordegustacoes);
                    dadosGerais.data.push(item.datareal);
                    dadosGerais.categoria.push(item.categoria);
                    dadosGerais.ativacoes.push(item.ativacoes);
                    dadosGerais.cancelamentos.push(item.cancelamentos);
                    dadosGerais.saldo.push(item.saldo);
                });

                const graficoRevendas5 = this.dataGraficos.twoCharts(dadosGerais);
                console.log('Grafico Revendas 5:', graficoRevendas5); 
            }

            if (permission === '2') {
                const SQLCommand = `SELECT * FROM public."dadosGeral" WHERE gerente = $1`;
                const values = [username];

                const result = await this.connection.modelQuery(SQLCommand, values);
                console.log(result)

                const dadosGerentesEspecificos: DadosGerais = {
                    revendas: [],
                    contratosFaturados: [],
                    degustacoes: [],
                    recorrencia: [],
                    valorDegustacoes: [],
                    data: [],
                    categoria: [],
                    ativacoes: [],
                    cancelamentos: [],
                    saldo:[]
                };

                result.forEach((item: any) => {
                    dadosGerentesEspecificos.revendas.push(item.revendas);
                    dadosGerentesEspecificos.contratosFaturados.push(item.contratos_faturados);
                    dadosGerentesEspecificos.degustacoes.push(item.degustacoes);
                    dadosGerentesEspecificos.recorrencia.push(item.recorrencia);
                    dadosGerentesEspecificos.valorDegustacoes.push(item.valordegustacoes);
                    dadosGerentesEspecificos.data.push(item.datareal);
                    dadosGerentesEspecificos.categoria.push(item.categoria);
                    dadosGerentesEspecificos.ativacoes.push(item.ativacoes);
                    dadosGerentesEspecificos.cancelamentos.push(item.cancelamentos);
                    dadosGerentesEspecificos.saldo.push(item.saldo);
                });

                const graficoRevendas5gerente = this.dataGraficos.twoCharts(dadosGerentesEspecificos);
                console.log('Grafico Revendas 5 Gerente:', graficoRevendas5gerente);

                const graficosRecorrenciagerente = this.dataGraficos.separarPorMes(dadosGerentesEspecificos);
                console.log('Gráficos Recorrência Gerente:', graficosRecorrenciagerente);

                const KPIAtivacosCancelamentosSaldo = this.dataGraficos.separarAtivacoesCancelamentos(dadosGerentesEspecificos);
                console.log('KPI dados: ', KPIAtivacosCancelamentosSaldo);

            }
        } catch (error) {
            console.error('Falha na montagem da query!', error);
        }
    }
}
