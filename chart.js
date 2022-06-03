const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

function generate(tamanhos, data) {
    const width = 900; //px
    const height = 500; //px
    const backgroundColour = 'white';
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });

    let colors = ["#FF6133", "#339FFF", "#AC33FF", "#3CBC61"];

    let dataset = [];
    Object.keys(data).map(function (method, index) {
        let value = data[method];
        let methodName = method;
        let tempos = [];
        Object.keys(value).map(function (key, index) {
            let tempo = value[key];
            tempos.push(tempo);
        });

        let config = {
            label: methodName,
            data: tempos,
            fill: false,
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderWidth: 1,
            tension: 0.2,
            xAxisID: 'xAxis1',
        }
        dataset.push(config);

    });

    const configuration = {
        type: 'line',   // for line chart
        data: {
            labels: tamanhos,

            datasets: dataset
        },
        options: {
            scales: {
                y: {
                    suggestedMin: 0,
                }
            },
            layout: {
                padding: 40
            }
        }
    }
    run(chartJSNodeCanvas, configuration);
}

async function run(chartJSNodeCanvas, configuration) {
    const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
    const base64Image = dataUrl

    var base64Data = base64Image.replace(/^data:image\/png;base64,/, "");


    fs.writeFile(`graficos/AnaliseEmpirica.png`, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    return dataUrl
}

module.exports.generate = generate;