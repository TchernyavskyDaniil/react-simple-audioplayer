import PT from "prop-types";

// types for many components

export const audioDefaultProps = {
  title: "Default title",
  author: "Default author",
  url: "default url",
  img: "default img"
};

export const audioPropTypes = {
  title: PT.string.isRequired,
  author: PT.string.isRequired,
  url: PT.string.isRequired,
  img: PT.string,
  id: PT.number
};
