import React from "react";
import { Fragment } from "react";
const NewsCard = ({ article }) => {
  const timeAgo = (timeInPast) => {
    let res = "";
    let totalseconds = (new Date() - new Date(timeInPast)) / 1000;
    let days = Math.floor(totalseconds / (3600 * 24));
    let hours = Math.floor((totalseconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((totalseconds % 3600) / 60);
    let seconds = Math.floor(totalseconds % 60);
    if (days > 0) {
      res = `${days} d`;
    } else if (hours > 0) {
      res = `${hours} h`;
    } else if (minutes > 0) {
      res = `${minutes} m`;
    } else {
      res = `${seconds} s`;
    }
    return res;
  };
  return (
    <Fragment>
      <div key={article._id} className="h-[130px]  flex  p-3">
        <img className="w-[40%] block rounded-2xl" src={article.image} />
        <div className="w-[60%]  h-[100%] px-1">
          <div>
            <div className="flex-container-tech">
              <p className="text-[#525298]">{article.technology}</p>
              <svg
                width="3"
                height="3"
                viewBox="0 0 3 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="1.5" cy="1.5" r="1.5" fill="#C4C4C4" />
              </svg>
              <p className="margin-left">{timeAgo(article.updatedAt)} ago</p>
            </div>
          </div>
          <div>
            <p className="para text-xs !font-bold">"{article.title}"</p>
            <small>
              <span className="">by</span> <span>{article.author}</span>
            </small>
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

export default React.memo(NewsCard);
