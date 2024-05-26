import React from 'react';
import { styled } from 'styled-components';
import { Tldraw } from 'tldraw';

const A4Container = styled.div`
  width: 210mm;
  height: calc(100vh - 40px); /* Adjusting height based on window height */
  border: 1px solid #000;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  page-break-after: always;
  overflow: hidden; /* Ensure no scrollbars */
`;

const TldrawContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 10px 0;
`;

const A4Page = ({ title }) => {
  return (
    <A4Container>
      {title && <PageTitle>{title}</PageTitle>}
      <TldrawContainer>
        <Tldraw />
      </TldrawContainer>
    </A4Container>
  );
};

export default A4Page;
