import React from "react";
import Film from "./Film";
import FilmList from "./FilmList";
const Posts = ({ posts, displayState }) => {
  return (
    <>
      {posts[0] && displayState
        ? posts.map((post) => (
          <Film info={post} id={post[2]} key={post[2]}>
            {" "}
          </Film>
        ))
        : posts.map((post) => (
          <FilmList info={post} id={post[2]} key={post[2]}>
            {" "}
          </FilmList>
        ))}
    </>
  );
};
export default Posts;
