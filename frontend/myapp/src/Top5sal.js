import React, { useState, useEffect } from 'react';

function Top5sal() {
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (token) {
      fetch('http://localhost:5000/api/top-sales', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSalesData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      console.error("Unsuccessful to get data. Please make sure you're authenticated.");
    }
  }, []); 

  return (
    <>
      <h1 className="head">TOP 5 SALES</h1>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-2">#</div>
          <div className="col-lg-3">Sales Id</div>
          <div className="col-lg-3">Product Name</div>
          <div className="col-lg-2">Quantity</div>
          <div className="col-lg-2">Sale Amount</div>
        </div>
        <hr />
        {Array.isArray(salesData) && salesData.length > 0 ? (
          salesData.map((sale, index) => (
            <div className="row" key={index}>
              <div className="col-lg-2">{index + 1}</div>
              <div className="col-lg-3">{sale._id}</div> 
              <div className="col-lg-3">{sale.ProductName}</div>
              <div className="col-lg-2">{sale.Quantity}</div> 
              <div className="col-lg-2">{sale.Amount}</div> 
            </div>
          ))
        ) : (
          <div>No sales data available.</div>
        )}
      </div>
    </>
  );
}

export default Top5sal;


