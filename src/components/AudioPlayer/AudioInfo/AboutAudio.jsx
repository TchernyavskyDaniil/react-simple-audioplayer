import React, { memo } from "react";
import styled from "styled-components";
import PT from "prop-types";
import styledMap from "styled-map";

import { audioDefaultProps, audioPropTypes } from "../../../types/AudioType";

const Image = styled.img`
  width: ${styledMap`
    isList: 80px;
    default: 160px;
  `};
  border-radius: ${styledMap`
    isList: 50%;
    default: 0;  
  `};

  @media screen and (max-width: 768px) {
    width: ${styledMap`
      isList: 30%;
      default: 160px;
    `};
  }
`;

const Title = styled.span`
  font-size: ${styledMap`
    isList: 16px;
    default: 20px;
  `};
  line-height: ${styledMap`
    isList: 18px;
    default: 22px;
  `};
  transition: 0.4s ease color;
`;

const Author = styled(Title)`
  padding-left: ${styledMap`
      isList: 10px;
      default: 0;
   `};
`;

const Container = styled.div`
  display: flex;
  flex-direction: ${styledMap`
    isList: row;
    default: column;
  `};
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:hover {
    ${Title} {
      color: ${styledMap`
        isList: red;
        default: initial;
      `};
    }
  }
`;

const DescAudio = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    max-width: 70%;
  }
`;

const AboutAudio = ({ title, author, img, isList }) => (
  <Container isList={isList}>
    <DescAudio>
      <Title isList={isList}> {title} </Title>
      <Author isList={isList}> {author} </Author>
    </DescAudio>
    <Image src={img} isList={isList} />
  </Container>
);

AboutAudio.defaultProps = {
  ...audioDefaultProps,
  isList: false
};

AboutAudio.propTypes = {
  ...audioPropTypes,
  isList: PT.bool
};

// using memo for non render others

export default memo(AboutAudio);
