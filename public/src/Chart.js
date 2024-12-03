function configChartsLine(typeChart, titleInternalChart, data, categories, title, nameid){
    try {
        const opitionsChartsLine = {
            chart: {
                type: typeChart,
                height: '90%'
              },
              
              series: [{
                name: titleInternalChart,
                data: data
              }],
              
              xaxis: {
                categories: categories
            },
            title: {
                text: title
            }
            
        };

        var chartLine = new ApexCharts(document.querySelector(nameid), opitionsChartsLine);
        return chartLine.render();
    } catch (error) {
        console.error('Erro ao instnaciar as configurações dos graficos: ', error);
    }
}

function configChartsPie(typeChart, dados, titleInternal, scale, title,  nameid){
    try {
        const opitionsChartsPie = {
            chart: {
                type: typeChart,
                height: '90%'
            },
            series: dados,
            labels: titleInternal,

            plotOptions: {
                pie: {
                  customScale: scale,
                  size: 200,
                  expandOnClick: true,
                  donut: {
                    size: '70%'
                  }
                }
            },

            title: {
                text: title
            }

        }

        var chartPie = new ApexCharts(document.querySelector(nameid), opitionsChartsPie);
        return chartPie.render();
    } catch (error) {
        console.error('Erro ao instnaciar as configurações dos graficos: ', error);
    }
}

function configChartsBars(nameid, typeCharts, internalTitle, dados, title){
    try {
        const opitionsChartsBars = {
          chart: {
            type: typeCharts,
            height: '90%'
          },
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          series: [{
            data: dados
          }],
          xaxis: {
            categories: internalTitle
          },
          title: {
            text: title
          }
        }

        var chartArea = new ApexCharts(document.querySelector(nameid), opitionsChartsBars);
        return chartArea.render();
    } catch (error) {
        console.error('Erro ao instnaciar as configurações dos graficos: ', error);
    }
}


function configChartsArea(nameid, typeCharts, internalTitle, dados, dataTime, title){
    try {
        const opitionsChartsArea = {
            chart: {
                height: 280,
                type: typeCharts
              },
              dataLabels: {
                enabled: false
              },
              series: [
                {
                  name: internalTitle,
                  data: dados,
                }
              ],
              fill: {
                type: "gradient",
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  stops: [0, 90, 100]
                }
              },
              xaxis: {
                categories: dataTime
              },
              title: {
                text: title
            }

        }

        var chartArea = new ApexCharts(document.querySelector(nameid), opitionsChartsArea);
        return chartArea.render();
    } catch (error) {
        console.error('Erro ao instnaciar as configurações dos graficos: ', error);
    }
}

//-----------------------------------------------------------------------------------------------------------//


function chartsLine(){
    try {
        configChartsLine('line', 'Vendas',  [10, 20, -10, 30, 40], [2020, 2021, 2022, 2023, 2024], 'Recorrencia Mensal', '#chart-line');
    } catch (error) {
        console.error('Erro ao instanciar os graficos principais')
    }
}

function chartsArea(){
    try {
        configChartsArea('#chart-area', 'area', 'Clientes Cancelados', [10, 90, 50, 10, 5, 80, 45], ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'], 'Ativações e Cancelamentos (Diarios)');
    } catch (error) {
        console.error('Erro ao instanciar os grafico de areas ', error)
    }
}

function tripeChartsDonut
(){
    try {
        configChartsPie('donut', [10,20], ['Ativações', 'Cancelamentos'], '1.0' ,'Top 5 Melhores Revendas', '#chart-pie');

        configChartsPie('donut', [10 , 20 , 40 , 70 ], ['Cliente Z', 'Cliente Y', 'Cliente X', 'Cliente W'], '1.0' ,'Degustações sobre Degustações Encerradas', '#chart-pie-one');
        
        configChartsPie('donut', [100, 256 , 40 , 70 ], ['Cliente F', 'Cliente G', 'Cliente H', 'Cliente I'], '1.0' ,'Ativações sobre Cancelamentos', '#chart-pie-two');
        
        configChartsPie('donut', [ 5, 1, 8 , 9], ['Cliente R', 'Cliente S', 'Cliente T', 'Cliente U'], '1.0' ,'Recorrencia sobre Valor Degustações', '#chart-pie-tree');
    
    } catch (error) {
        console.error('Erro ao instanciar os graficos em baixo das kpis')
    }
}

function chartBars(){
  try {
    configChartsBars( '#chart-bar','bar', ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'], [10, 50, 90 ,40, 90], 'Top 5 Piores revendas' )
  } catch (error) {
    console.error('Erro ao instanciar os grafico de barras: ', error)
  }
}

chartBars()
chartsLine()
chartsArea()
tripeChartsDonut()