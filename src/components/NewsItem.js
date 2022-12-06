import React from 'react'

const NewsItem=(props)=> {
    let { title, description, imgURL, NewsURL, author, date, source } = props
    return (
      <>
        <div className="card">
          <img src={imgURL} className="card-img-top" alt="..." style={{ width: "100%", height: "200px" }} />
          <div className="card-body">
            <h5 className="card-title">{title}...  <small><strong className="badge bg-secondary my-2">{source}</strong></small></h5>
            <p className="card-text">{description ? `${description}...` : ""}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toLocaleString()}</small></p>
            <a href={NewsURL} target="_blank" rel="noreferrer" className="btn  btn-sm btn-dark">Read more..</a>
          </div>
        </div>
      </>
    )
}

export default NewsItem