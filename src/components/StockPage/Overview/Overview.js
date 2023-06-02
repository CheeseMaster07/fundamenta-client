import React from 'react'
import { useLocation } from 'react-router-dom'

import BarChart from '../../Charts/BarChart'


export default function Overview() {
  const location = useLocation()
  const stock = location.state


  const chartData = {
    labels: ['2022', '2021', '2020'],
    datasets: [
      {
        label: "First",
        data: [1, 2, 3],
        backgroundColor: 'rgb(255, 238, 0)',
        barPercentage: .8,
        borderRadius: 3,
      },
      {
        label: "Second",
        data: 2,
        backgroundColor: 'rgb(255, 238, 0)',
        barPercentage: .8,
        borderRadius: 3,
      },
      {
        label: "Third",
        data: 3,
        backgroundColor: 'rgb(255, 238, 0)',
        barPercentage: .8,
        borderRadius: 3,
      }
    ],
  }
  let chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          display: false
        }
      },
      y1: {
        type: 'linear',
        display: false,
        position: 'left',
        ticks: {
          callback: function (value) {
            if (Math.abs(value) >= 1000000000000) {
              return (value / 1000000000000).toFixed(1) + 'T'
            } else if (Math.abs(value) >= 1000000000) {
              return (value / 1000000000).toFixed(1) + 'B';
            } else if (Math.abs(value) >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (Math.abs(value) >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            } else {
              return value;
            }
          },
          color: 'white'
        },
        grid: {
          color: 'rgb(30, 30, 30)'
        }
      },
      y2: {
        type: 'linear',
        display: false,
        position: 'right',
        max: 0,
        min: 1,
        ticks: {
          callback: function (value) {
            return (value * 100).toFixed(0) + '%'; // convert it to percentage
          },
          color: 'white'
        },
        grid: {
          display: false
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (data) {
            if (data.dataset.yAxisID == 'y1') {
              if (Math.abs(data.raw) >= 1000000000000) {
                return (data.raw / 1000000000000).toFixed(1) + 'T'
              } else if (Math.abs(data.raw) >= 1000000000) {
                return (data.raw / 1000000000).toFixed(1) + 'B';
              } else if (Math.abs(data.raw) >= 1000000) {
                return (data.raw / 1000000).toFixed(1) + 'M';
              } else if (Math.abs(data.raw) >= 1000) {
                return (data.raw / 1000).toFixed(1) + 'K';
              } else {
                return data.raw;
              }
            } else if (data.dataset.yAxisID == 'y2') {
              return (data.raw * 100).toFixed(2) + '%';
            }
          }
        }
      },
      legend: {
        labels: {
          useBorderRadius: true,
          borderRadius: 3,
          usePointStyle: false,
          pointStyle: false,
          color: 'white'
        }
      },
    }
  }

  return (
    <>
      <BarChart data={chartData} options={chartOptions} />


    </>
  )
}
