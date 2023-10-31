import React, { useState } from 'react';


function Register() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
       
        setRegistrationSuccess(true);
        setTimeout(() => {
          setRegistrationSuccess(false);
        }, 2000); 
      } else {
        
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <>
    <div>
    {registrationSuccess && (
        <div className='alert alert-success' role='alert'>
          Registration successful!
        </div>
      )}
    </div>
      <h1 className='head'>REGISTER FORM</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="LastName"
            value={formData.LastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="Password"
            value={formData.Password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      
    </>
  );
}

export default Register;



// import React, { useState } from 'react';


// function Register() {
//   const [formData, setFormData] = useState({
//     FirstName: '',
//     LastName: '',
//     Email: '',
//     Password: '',
//   });

//   const [registrationSuccess, setRegistrationSuccess] = useState(false);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch('http://localhost:5000/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (response.ok) {
//         // Successful registration
//         setRegistrationSuccess(true);
//         setTimeout(() => {
//           setRegistrationSuccess(false);
//         }, 2000); 
//       } else {
//         // Handle errors
//         console.error('Registration failed');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   return (
//     <>
//     <div>
//     {registrationSuccess && (
//         <div className='alert alert-success' role='alert'>
//           Registration successful!
//         </div>
//       )}
//     </div>
//       <h1 className='head'>REGISTER FORM</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">First Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="FirstName"
//             value={formData.FirstName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Last Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="LastName"
//             value={formData.LastName}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             name="Email"
//             value={formData.Email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="Password"
//             value={formData.Password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <button type="submit" className="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//       {/* {registrationSuccess && (
//         <div className='alert alert-success' role='alert'>
//           Registration successful!
//         </div>
//       )} */}
//     </>
//   );
// }

// export default Register;
