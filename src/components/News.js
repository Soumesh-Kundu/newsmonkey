import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const captialize = (word) => { return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() }
  const fetchdata = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    console.log(url)
    let res = await fetch(url)
    props.setProgress(50)
    let data = await res.json()
    props.setProgress(75)
    setArticles([...articles, ...data.articles])
    setTotalResults(data.totalResults)
    setloading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `NewsMonkey - ${captialize(props.category)}`
    fetchdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
    setPage((value) => value + 1)
    let res = await fetch(url)
    let data = await res.json()
    setArticles([...articles, ...data.articles])
    setTotalResults(data.totalResults)
    setloading(false)
  }
  return (
    <>
     
          <div className="container-fluid my-3" style={{paddingTop:'3rem' }}>
            <h1 className='text-center'>NewMonkey - Top {captialize(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
              dataLength={articles.length}
              next={fetchMoreData}
              hasMore={articles.length !== totalResults}
              loader={<Spinner />}
            >
              <div className="container">
                <div className="row py-4">
                  {articles.map((element, index) => {
                    return <div className="col-md-4 my-2" key={index}>
                      <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 88) : ""} imgURL={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2022-09/voo9f0o8_kl-rahul-afp_625x300_08_September_22.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=675"} NewsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
      </div>
    </>
  )
}


News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number
}
export default News