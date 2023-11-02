import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #F4F4F4;
  font-family: Arial, sans-serif;
`;

const Topic = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #427d9d;
  font-weight: 500;
`;

const Category = styled.h5`
  color: #164863;
  font-size: 20px;
`;

const CategoryButton = styled.button`
  height: 100%;
  margin: 5px;
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #164863;
  }
`;

const ButtonContainer = styled.div`
  padding: 10px;
`;

const SortDropdown = styled.select`
  background-color: #F4F4F4;
  color: #427d9d;
  border: 2px solid #427d9d;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #164863;
    color: white;
  }
`;

const SortOption = styled.option`
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #164863;
    color: white;
  }
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const ProductBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #427d9d;
  padding: 10px;
  height: 270px;
  width: 270px;
  cursor: pointer;
  transition: transform 0.3s, background-color 0.3s;

  &:hover {
    transform: scale(1.05);
    background-color: #F0F0F0;
  }
`;

const ProductImage = styled.img`
  height: 100px;
  width: 100px;
`;

const TotalProducts = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #427d9d;
  margin-bottom: 20px;
`;

function Main({ button, setButton }) {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [total, setTotal] = useState(false);
  const [sortOption, setSortOption] = useState('Sort By');
  const [filterClicked, setFilterClicked] = useState(false);

  useEffect(() => {
    axios('https://fakestoreapi.com/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleFilter = (category) => {
    const filtered = products.filter((data) => category === data.category);
    setFilteredItems(filtered);
    setTotal(true);
    setFilterClicked(true);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    const sorted = [...filteredItems];
    if (e.target.value === 'priceLowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (e.target.value === 'priceHighToLow') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredItems(sorted);
  };

  return (
    <Container>
      <Topic>Products Page Using React and Styled Components</Topic>
      <ButtonContainer>
        <Category>Categories</Category>
        {button.map((data, i) => (
          <CategoryButton key={i} onClick={() => handleFilter(data.category)}>
            {data.name}
          </CategoryButton>
        ))}
      </ButtonContainer>
      {filterClicked &&( <ButtonContainer>
          <Category>Sort By Price</Category>
         
          <SortDropdown value={sortOption} onChange={handleSortChange}>
            <SortOption value="Sort By" disabled>Sort By</SortOption>
            <SortOption value="priceLowToHigh">Price low to high</SortOption>
            <SortOption value="priceHighToLow">Price high to low</SortOption>
          </SortDropdown>
      </ButtonContainer>)}
      <TotalProducts>Total Products: {total ? filteredItems.length : products.length}</TotalProducts>
      <ProductContainer>
        {total
          ? filteredItems.map((data) => (
              <ProductBox key={data.id}>
                <ProductImage src={data.image} />
                <p>{data.title}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <p>Price: ${data.price}</p>
                  <p>
                    Ratings({data.rating.rate}) <span> {data.rating.count}</span>
                  </p>
                </div>
              </ProductBox>
            ))
          : products.map((data) => (
              <ProductBox key={data.id}>
                <ProductImage src={data.image} />
                <p>{data.title}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <p>Price: ${data.price}</p>
                  <p>
                    Ratings({data.rating.rate}) <span> {data.rating.count}</span>
                  </p>
                </div>
              </ProductBox>
            ))}
      </ProductContainer>
    </Container>
  );
}

export default Main;
