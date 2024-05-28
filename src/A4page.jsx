import React from 'react';
import axios from 'axios';
import { styled } from 'styled-components';
import { Tldraw } from 'tldraw';
import { Link } from 'react-router-dom';

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
  height: calc(100% - 50px); /* Adjusted height to make room for the button */
`;

const PageTitle = styled.h2`
  text-align: center;
  margin: 10px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
`;

const CustomizeButton = styled(Link)`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const A4Page = ({ title }) => {

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/canva/fp', null, {
        withCredentials: true
      });
      // const response = await axios.post('http://localhost:8000/api/canva/fp', {withCredentials:true});
      if (response.status === 201) {
        alert(`Front page saved successfully`);
        setTimeout(() => {
          window.location.href = '/ai/customizemidpage';
        }, 1000);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10 p-4 bg-blue-500 border rounded-r-lg border-gray-300 shadow-md">
        Front Cover
      </div>
      <A4Container>
        {title && <PageTitle>{title}</PageTitle>}
        <TldrawContainer>
          <Tldraw />
        </TldrawContainer>
        <ButtonContainer>
          <CustomizeButton to="/ai/customizemidpage" onClick={handleClick}>next</CustomizeButton>
        </ButtonContainer>
      </A4Container>
    </>
  );
};

export default A4Page;
