import React, { useState, useEffect } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('cryptocurrency');  // Default to Bitcoin to ensure there's always a keyword
  const { data: cryptoNews, isLoading, error } = useGetCryptoNewsQuery({
    keyword: newsCategory,
    page: '0',
    size: simplified ? '6' : '12'
  });

  console.log(cryptoNews)
  useEffect(() => {
    setNewsCategory('cryptocurrency');  // Update the keyword here if needed based on user selection or other criteria
  }, []);
  
  if (isLoading) return <Loader />;
  if (error) return <div>Error fetching news: {error.message}</div>;
  if (!cryptoNews || !cryptoNews.data || !cryptoNews.data.items || cryptoNews.data.items.length === 0) return <div>No news found</div>;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.data.items.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news.image?.thumbnail?.contentUrl || demoImage} alt={news.title} />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                {news.provider && news.provider.length > 0 ? (
                  <Avatar src={news.provider[0].image?.thumbnail?.contentUrl || demoImage} alt="news provider logo" />
                ) : null}
                <Text className="provider-name">{news.provider && news.provider.length > 0 ? news.provider[0].name : 'Unknown'}</Text>
                <Text>{moment(news.datePublished).fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;