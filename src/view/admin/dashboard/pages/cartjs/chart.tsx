import React from 'react';
import { Chart, registerables, ChartType } from 'chart.js';

import { get } from '../../../../../lib/axios.js';


class chart extends React.Component<any, any>{

        async componentDidMount(){

            var getMhs: any = await get(`${process.env.REACT_APP_BASE_URL}api/mhs-statistik`);


            var crnYears = new Date().getFullYear(); 

            var c = document?.getElementById('myChart') as HTMLCanvasElement ;
            var ctx: any = c.getContext('2d')
            
            Chart.register(...registerables)
            
            var myChart = new Chart(ctx, {
                type: 'line' as ChartType ,
                data: {
                    labels: getMhs.data.label,

                    datasets: [{
                        label: 'Mahasiswa',
                        data: getMhs.data.mahasiswa,
                        backgroundColor: [
                            '#add8e6'
                        ],
                        borderColor: [
                            '#add8e6'
                        ],
                        borderWidth: 1,
                        fill: true,
                    }]
                },

                options: {
                    responsive: true,
                    interaction: {
                      mode: 'index',
                      intersect: false
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

        }

    
    render(){
        return (
            <div className='w-full'>
                <canvas id="myChart"></canvas>
            </div>
       )
    }
}

export default chart;