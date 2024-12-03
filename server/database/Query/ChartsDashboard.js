"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerysDinamicas = void 0;
const connectionDB_1 = require("../../database/connectionDB");
const indexData_1 = require("../../../data/indexData");
const promises_1 = require("inspector/promises");
class QuerysDinamicas {
    constructor(app) {
        this.connection = new connectionDB_1.ConnectionDB();
        this.dataGraficos = new indexData_1.IndexData();
    }
    MontagemMain(permission, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dadosGerais = {
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
                    const result = yield this.connection.modelQueryUnic(SQLCommand);
                    result.forEach((item) => {
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
                    promises_1.console.log('Grafico Revendas 5:', graficoRevendas5);
                }
                if (permission === '2') {
                    const SQLCommand = `SELECT * FROM public."dadosGeral" WHERE gerente = $1`;
                    const values = [username];
                    const result = yield this.connection.modelQuery(SQLCommand, values);
                    promises_1.console.log(result);
                    const dadosGerentesEspecificos = {
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
                    result.forEach((item) => {
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
                    promises_1.console.log('Grafico Revendas 5 Gerente:', graficoRevendas5gerente);
                    const graficosRecorrenciagerente = this.dataGraficos.separarPorMes(dadosGerentesEspecificos);
                    promises_1.console.log('Gráficos Recorrência Gerente:', graficosRecorrenciagerente);
                    const KPIAtivacosCancelamentosSaldo = this.dataGraficos.separarAtivacoesCancelamentos(dadosGerentesEspecificos);
                    promises_1.console.log('KPI dados: ', KPIAtivacosCancelamentosSaldo);
                }
            }
            catch (error) {
                promises_1.console.error('Falha na montagem da query!', error);
            }
        });
    }
}
exports.QuerysDinamicas = QuerysDinamicas;
