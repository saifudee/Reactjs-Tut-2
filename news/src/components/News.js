import React, {useState,useEffect} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState();
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);
 
  document.title = `${props.category} - NewsMonkey`
  // const updateNews =  async ()=> {
  //   props.setProgress(10)
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=
  //   4b4f270d9edb44fc92398eb3155e22d2&page=${page}&pageSize=${props.pageSize}`
  //   setLoading(true)
  //   let data = await fetch(url);
  //   props.setProgress(30)
  //   let parsedData = await data.json();
  //   props.setProgress(70)
  //   setArticles(parsedData.articles)
  //   setLoading(false)
  //   setTotalResults(parsedData.totalResults)
  //   props.setProgress(100)
  // }
  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b4f270d9edb44fc92398eb3155e22d2&page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);

}
  useEffect(() => {
    updateNews(); 
}, [])
  // const fetchMoreData = async () => {
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}
  // &apiKey=4b4f270d9edb44fc92398eb3155e22d2&page=${page+1}&pageSize=${props.pageSize}`
  // setPage(page + 1);
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   setArticles(articles.concat(parsedData.articles))
  //   setTotalResults(parsedData.totalResults)
  // };
  const fetchMoreData = async () => {   
    setPage(page+1) 
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4b4f270d9edb44fc92398eb3155e22d2&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
    return (
      <>
        <h2 className='text-center' style={{margin:'35px 0px',marginTop:'90px'}}>NewsMonkey - Top {props.category} HeadLines</h2>
        {loading && <Spinner/>}
        {/* <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!== totalResults}
          loader={<Spinner/>}
        > */}
         <InfiniteScroll
                    // dataLength={this.state.articles.length}
                    // next={this.fetchMoreData}
                    // hasMore={this.state.articles.length !== this.state.totalResults}
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
          <div className="container"> 
            <div className="row">
              {articles.map((e) => {
                return <div className="col-md-4" key={e.url}>
                  <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name} content={e.content} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled={state.page<=1} className="btn btn-dark" onClick={handlePreChange}>&larr;Previous</button>
        <button type="button" disabled={state.page + 1>Math.ceil(state.totalResults/props.pageSize)}className="btn btn-dark" onClick={handleNexChange}>Next&rarr;</button>
        </div> */}
      </>
    )
  }
  News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News;