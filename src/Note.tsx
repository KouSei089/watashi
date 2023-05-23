import React from "react";
import { useEffect, useState } from "react";

const Note = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://note.com/api/v2/creators/izuha0/contents?kind=note&page=1")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => alert("error"));
  }, []);

  return (
    <>
      <div>{data[0]}</div>
    </>
  )
}

export default Note;
