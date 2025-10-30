import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GrowthChart = ({ data }) => {
  const labels = data.yearlyBreakdown.map(item => item.year);
  const endingBalances = data.yearlyBreakdown.map(item => item.endingBalance);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Portfolio Value ($)',
        data: endingBalances,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#e0e0e0',
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Retirement Savings Growth Over Time',
        color: '#e0e0e0',
        font: {
          size: 18,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `Balance: $${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#b0b0b0'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#b0b0b0',
          callback: function(value) {
            return '$' + value.toLocaleString('en-US');
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="growth-chart">
      <div className="growth-chart__container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default GrowthChart;
