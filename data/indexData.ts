export class IndexData {
    constructor() {}

    // Função para obter as 5 melhores revendas
    public twoCharts(dados: { revendas: string[]; recorrencia: number[] }): string[] | undefined {
        try {
            const revendasAgregadas = dados.revendas.reduce((acc: any, revenda: string, index: number) => {
                if (!acc[revenda] || acc[revenda] < dados.recorrencia[index]) {
                    acc[revenda] = dados.recorrencia[index];
                }
                return acc;
            }, {});

            const revendasComRecorrencia = Object.entries(revendasAgregadas).map(([revenda, recorrencia]) => ({
                revenda,
                recorrencia
            }));

            const melhoresRevendas = revendasComRecorrencia
                .sort((a: any, b: any) => b.recorrencia - a.recorrencia)
                .slice(0, 5)
                .map(item => item.revenda);

            console.log(melhoresRevendas)
            return melhoresRevendas;
        } catch (error) {
            console.error('Falha ao carregar as 5 melhores revendas:', error);
            return undefined;
        }
    }

    

    public separarPorMes(dados: { data: string[]; recorrencia: (number | string)[] }): { [key: string]: { valor: string, diferenca: string } } {
        const dadosPorMes: { [key: string]: { valor: string, diferenca: string } } = {};
    
        const ultimoDiaPorMes: { [key: string]: string } = {}; 
        const recorrenciaPorData: { [key: string]: number } = {}; 
    
        const formatarComPonto = (valor: number): string => {
            const valorComCentavos = valor.toFixed(2);
            const partes = valorComCentavos.split('.');
            const parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
            const parteDecimal = partes[1];
            return `${parteInteira},${parteDecimal}`;
        };
    
        for (let i = 0; i < dados.data.length; i++) {
            const data = new Date(dados.data[i]);
            const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
            const dataFormatada = data.toISOString().split('T')[0];
    
            let recorrencia = dados.recorrencia[i];
            if (typeof recorrencia === 'string') {
                recorrencia = parseFloat(recorrencia);
            }
    
            if (recorrenciaPorData[dataFormatada]) {
                recorrenciaPorData[dataFormatada] += recorrencia;
            } else {
                recorrenciaPorData[dataFormatada] = recorrencia;
            }
    
            if (!ultimoDiaPorMes[mesAno] || data > new Date(ultimoDiaPorMes[mesAno])) {
                ultimoDiaPorMes[mesAno] = dataFormatada;
            }
        }
    
        const mesesOrdenados = Object.keys(ultimoDiaPorMes).sort();
    
        let valorAnterior = 0;
    
        for (const mesAno of mesesOrdenados) {
            const ultimoDia = ultimoDiaPorMes[mesAno];
            const recorrencia = recorrenciaPorData[ultimoDia];
            const valorFormatado = formatarComPonto(recorrencia);
    
            let diferenca = 0;
            if (valorAnterior > 0) {
                diferenca = recorrencia - valorAnterior;
            }
    
            const diferencaFormatada = formatarComPonto(diferenca);
    
            dadosPorMes[mesAno] = { valor: valorFormatado, diferenca: diferencaFormatada };
    
            valorAnterior = recorrencia;
        }
        console.log(dadosPorMes)
    
        return dadosPorMes;
    }

    public separarAtivacoesCancelamentos(dados: { data: string[]; ativacoes: (number | string)[]; cancelamentos: (number | string)[]; saldo: (number | string)[] }): { [key: string]: { ativacoes: number, cancelamentos: number, saldo: number } } {
    
        const dadosPorMes: { [key: string]: { ativacoes: number, cancelamentos: number, saldo: number } } = {};
        
        for (let i = 0; i < dados.data.length; i++) {
            const data = new Date(dados.data[i]);
            const mesAno = `${data.getFullYear()}-${(data.getMonth() + 1).toString().padStart(2, '0')}`;
        
            let ativacoes = dados.ativacoes[i];
            let cancelamentos = dados.cancelamentos[i];
            let saldo = dados.saldo[i];
        
            // Garantir que as ativações, cancelamentos e saldo sejam números
            if (typeof ativacoes === 'string') {
                ativacoes = parseFloat(ativacoes);
            }
            if (typeof cancelamentos === 'string') {
                cancelamentos = parseFloat(cancelamentos);
            }
            if (typeof saldo === 'string') {
                saldo = parseFloat(saldo);
            }
        
            // Somar as ativações e cancelamentos para cada mês
            if (dadosPorMes[mesAno]) {
                dadosPorMes[mesAno].ativacoes += ativacoes;
                dadosPorMes[mesAno].cancelamentos += cancelamentos;
                dadosPorMes[mesAno].saldo += saldo;
            } else {
                dadosPorMes[mesAno] = {
                    ativacoes: ativacoes,
                    cancelamentos: cancelamentos,
                    saldo: saldo // Inicializa com o saldo fornecido
                };
            }
        }
    
        console.log(dadosPorMes);
        return dadosPorMes;
    }
    
    
    
    private formatarComPonto(valor: number): string {
        const valorComCentavos = valor.toFixed(2);
    
        const partes = valorComCentavos.split('.');
        const parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.'); 
        const parteDecimal = partes[1];
    
        return `${parteInteira},${parteDecimal}`;
    }
}