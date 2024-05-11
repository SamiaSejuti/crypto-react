import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Ensures the date-fns adapter is used

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const { Title: AntdTitle } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  if (!coinHistory || !coinHistory.data || !coinHistory.data.history || coinHistory.data.history.length < 7) {
    return <p>No data available or insufficient data for the last 7 days.</p>;
  }

  // Get the last 7 entries from the history
  const last7DaysData = coinHistory.data.history.slice(-7);

  const labels = last7DaysData.map(entry => new Date(entry.timestamp * 1000));
  const dataPoints = last7DaysData.map(entry => entry.price);

  const data = {
    labels,
    datasets: [{
      label: 'Price In USD',
      data: dataPoints,
      fill: false,
      borderColor: '#0071bd',
      backgroundColor: '#0071bd',
    }]
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MM/dd/yyyy'
          }
        },
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          maxTicksLimit: 7
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price in USD'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `$${tooltipItem.parsed.y}`;
          }
        }
      }
    }
  };

  return (
    <>
      <Row className="chart-header">
        <AntdTitle level={2} className="chart-title">7-Day {coinName} Price Trends</AntdTitle>
        <Col className="price-container">
          <AntdTitle level={5} className="price-change">Change: {coinHistory?.data?.change}%</AntdTitle>
          <AntdTitle level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</AntdTitle>
        </Col>
      </Row>
      
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
