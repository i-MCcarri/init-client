import React, { useState, useRef, useCallback } from 'react';
import FeedSearch from './FeedSearch';
import '../../css/AccountInformation.css'
import Post from '../Post/Post'

export default function Feed() {
  const [observed, setObserver] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(2);
  const { results, hasMore, loading, error } = FeedSearch(observed, pageNumber, limit);


  const observer = useRef();

  const lastResultElementRef = useCallback(node => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {

        setPageNumber(prevPageNumber => prevPageNumber + 1);
        setObserver(!observed);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return (
    <>
      {!results.length
        ? null
        : <div>
          <div className='Feed'>
            {results.map((project, index) => (results.length === index + 1)
              ? <div key={index} className='project-wrapper' ref={lastResultElementRef} ><Post {...project} /></div>
              : <div key={index} className='project-wrapper'><Post {...project} /> </div>
            )}
          </div>
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error'}</div>
        </div>
      }
    </>
  );

};