import React, { useState, useEffect } from 'react';
import { linkIcon, loader } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({ url: '', summary: '' });
  const [allArticles, setAllArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    const email = localStorage.getItem("email");
    console.log('Logged in status:', loggedInStatus);
    console.log('Retrieved email:', email);

    setIsLoggedIn(!!loggedInStatus);
    setUserEmail(email || ''); // Ensure it's set or default to an empty string

    if (loggedInStatus && email) {
      const articlesFromLocalStorage = JSON.parse(localStorage.getItem(email)) || [];
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      alert('Please log in to access more summaries.');
      return;
    }

    const email = localStorage.getItem("email");
    console.log('Email before sending:', email); // Log the email here

    if (!email) {
      alert('Email not found. Please log in again.');
      return;
    }

    const existingArticle = allArticles.find((item) => item.url === article.url);
    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));

      const search = article.url; // URL to be saved
      const dateTime = new Date();

      const bodyData = { email, search, dateTime };
      
      // Log the data being sent
      console.log('Data being sent to server:', bodyData);

      try {
        const response = await fetch('http://localhost:5000/api/summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error:', errorData.error);
        } else {
          console.log('Summary data saved successfully');
        }
      } catch (error) {
        console.error('Failed to send summary data:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  return (
    <section className='mt-16 w-full max-w-xl'>
      <div className='flex flex-col w-full gap-2'>
        <div className='relative flex justify-center items-center'>
          <img src={linkIcon} alt='link-icon' className='absolute left-0 my-2 ml-3 w-5' />
          <input
            type='url'
            placeholder='Paste the article link'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input peer'
          />
          <button
            type='button'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
            onClick={handleSubmit}
          >
            <p>↵</p>
          </button>
        </div>

        {/* Browse History (only show if logged in) */}
        {isLoggedIn && (
          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {allArticles.reverse().map((item, index) => (
              <div key={`link-${index}`} onClick={() => setArticle(item)} className='link_card'>
                <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <div>
            <p className='font-inter font-bold text-black text-center'>Well, that wasn't supposed to happen...</p>
            <p className='font-satoshi font-normal text-gray-700'>{error?.data?.message || 'An unexpected error occurred.'}</p>
          </div>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
