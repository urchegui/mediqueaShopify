import React, { useEffect, useState } from 'react';
import { useShopifyContext } from '../services/ShopifyProvider';
import { useLocation } from 'react-router-dom';
import "./blog.scss";
import Article from '../components/Article';

const Blogs = () => {
  const { state, fetchArticles } = useShopifyContext();
  const { articles } = state;
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchAndSetArticles = async () => {
      setLoading(true);
      try {
        await fetchArticles(category);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetArticles();
  }, [location]);

  return (
    <div className="article-wrap">
      {loading ? (
        <p className='text'>Cargando...</p>
      ) : articles == null || articles.length === 0 ? (
        <p className='text'>Lo sentimos, no hay artículos disponibles.</p>
      ) : (
        articles.map((article, idx) => (
          <Article key={idx} data={article} />
        ))
      )}
    </div>
  );
};

export default Blogs;
