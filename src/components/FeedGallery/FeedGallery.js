import React, { useState, useRef, useCallback } from 'react';
import FeedSearch from './FeedSearch';
import { buffTo64 } from '../Utils/Utils';
import '../../css/AccountInformation.css';

export default function FeedGallery() {
  console.log('hey im renderin here!')
  const [observed, setObserver] = useState(false);
  // const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(2);

  const { results, hasMore, loading, error } = FeedSearch(observed, pageNumber, limit);
  console.log('results?', results);

  const observer = useRef();

  const lastResultElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Visible');
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        setObserver(!observed);
      };
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  //Added a search bar to choose our Queries (actual app this is stretch goal)
  //Every query we want to default to Page 1. Starting off on Page 7 or so would be jarring
  // function handleSearch(e) {
  //   setQuery(e.target.value);
  //   setPageNumber(1);
  // }

  return (
    <>
    {!results.length 
      ? <br />
      : <div>
      <div className='gallery'>
          {results.map((project, index) => {
              if (results.length === index + 1) {
                return <div key={project.id} className='img-container' ref={lastResultElementRef}>                        
                          <img
                              className='gallery-img'
                              alt={`project ${project.post_title}`}
                              src={`data:image/${project.post_image_type};base64,${buffTo64(project.post_image_file.data)}`}
                          />
                      </div>
              } else {
                return <div key={project.id} className='img-container'>                        
                          <img
                              className='gallery-img'
                              alt={`project ${project.post_title}`}
                              src={`data:image/${project.post_image_type};base64,${buffTo64(project.post_image_file.data)}`}
                          />
                      </div>

              }
          })}
      </div>
      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Error'}</div>
    </div>
    }
    </>
  )
};