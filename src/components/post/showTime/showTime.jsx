import React from "react";

function showTime({ timestamp }) {
  const getDiff = (oldTime) => {
    let newTime = new Date();
    let diff = Math.floor((newTime - oldTime.seconds * 1000) / 1000);

    let hrs = Math.floor(diff / 3600);
    let min = Math.floor(diff / 60);
    let sec = diff;

    let date = new Date(oldTime.seconds * 1000);
    date = date.toLocaleString();

    if (hrs >= 24) {
      return <small className="text-muted m-0">{date}</small>;
    } else if (hrs) {
      return <small className="text-muted m-0">{hrs} hours ago </small>;
    } else if (min) {
      return <small className="text-muted m-0">{min} minutes ago</small>;
    } else if (sec) {
      return <small className="text-muted m-0">{sec} seconds ago</small>;
    }
  };

  const date = getDiff(timestamp || 0);

  return <div className="m-0">{date}</div>;
}

export default showTime;
