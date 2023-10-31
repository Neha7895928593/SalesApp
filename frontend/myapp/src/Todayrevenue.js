import './App.css';



import React, { useState, useEffect } from 'react';

function TodayTotalRevenue() {
  const [totalRevenue, setTotalRevenue] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('auth'); 

    if (!token) {
     
      return;
    }

    fetch('http://localhost:5000/api/total-revenue', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        setTotalRevenue(data.totalRevenue);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const formatToIndianRupees = (amount) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return formatter.format(amount);
  };

  return (
    <div className='Apps' >
      <h1>Today's Total Revenue</h1>
      {totalRevenue !== null ? (
        <p>Total Revenue: {formatToIndianRupees(totalRevenue)}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TodayTotalRevenue;

// import React, { useState, useEffect } from 'react';

// function TodayTotalRevenue() {
//   const [totalRevenue, setTotalRevenue] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('auth'); 

//     if (!token) {
      
//       return;
//     }

//     fetch('http://localhost:5000/api/total-revenue', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else if (response.status === 401) {
          
//         } else {
//           throw new Error('Failed to fetch data');
//         }
//       })
//       .then((data) => {
//         setTotalRevenue(data.totalRevenue);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Today's Total Revenue</h1>
//       {totalRevenue !== null ? (
//         <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default TodayTotalRevenue;



