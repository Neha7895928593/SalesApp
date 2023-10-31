
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addsale() {
  const [ProductName, setProductName] = useState('');
  const [Quantity, setQuantity] = useState(0);
  const [Amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth');
    if (!token) {
      toast.error('You must be logged in to submit a sale entry');
      return;
    }

    const data = {
      ProductName,
      Quantity,
      Amount,
      token,
    };

    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const salesData = await response.json();
        console.log(salesData);
        toast.success('Sale entry submitted successfully');
        
        setProductName('');
        setQuantity(0);
        setAmount(0);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit sale entry');
    }
  };

  return (
    <>
      <h1 className="head mt-50px">ADD SALE ENTRY</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            value={ProductName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default Addsale;



// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

// function Addsale() {

//   const [ProductName, setProductName] = useState('');
//   const [Quantity, setQuantity] = useState(0);
//   const [Amount, setAmount] = useState(0);
//   const [addSuccess, setAddSuccess] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token=localStorage.getItem("auth")

//     const data = {
//       ProductName,
//       Quantity,
//       Amount,
//       token
//     };
//     //const [addSuccess , setAddSuccess] = useState(false);

//     try {
//       const response = await fetch('http://localhost:5000/api/sales', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       // if (response.ok) {
//         const salesdata=await response.json()
//         console.log(salesdata)
//         toast(salesdata.message)
         
//         //  setAddSuccess(true);
//         //  setTimeout(() => {
//         //    setAddSuccess(false);
//         //  }, 2000); 
       
//         //console.log('Sale entry submitted successfully');
//       //} 
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//     <div>
//     {addSuccess && (
//         <div className='alert alert-success' role='alert'>
//           Sale entry submitted successfully
         
//         </div>
//       )}
//     </div>
//       <h1 className="head mt-50px">ADD SALE ENTRY</h1>
//       <br />
//       <br />
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Product Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={ProductName}
//             onChange={(e) => setProductName(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Quantity</label>
//           <input
//             type="number"
//             className="form-control"
//             value={Quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Amount</label>
//           <input
//             type="number"
//             className="form-control"
//             value={Amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>
//         <div>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>

//       </form>
//       <ToastContainer/>
//     </>
//   );
// }

// export default Addsale;

// import React from 'react'
// import './App.css';

// function Addsale() {
//   return (
//     <>
//     <h1 className='head mt-50px ' >ADD SALE ENTRY</h1>
//     <br />
//     <br />
//     <form>
//   <div className="mb-3">
//     <label  class="form-label">Product Name</label>
//     <input type="text" class="form-control" />
   
//   </div>
//   <div class="mb-3">
//     <label class="form-label">Quantity</label>
//     <input type='number' class="form-control"/>
//   </div>
//   <div class="mb-3">
    
//     <label   class="form-label">Amount</label>
//     <input type="number" class="form-control"/>
//   </div>
//   <div>
//   <button type="submit" class="btn btn-primary">Submit</button>
//   </div>
// </form>
//     </>
//   )
// }

// export default Addsale;