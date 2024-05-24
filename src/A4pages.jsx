import React from 'react';
import A4Page from './A4page';
import { styled } from 'styled-components';

const PagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const A4Pages = () => {
  const pages = [1, 2, 3, 4];

  return (
    <PagesContainer>
      {pages.map((page, index) => (
        <A4Page key={index} title={`Page ${page}`} />
      ))}
    </PagesContainer>
  );
};

export default A4Pages;
