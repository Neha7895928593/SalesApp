import React, { useState } from 'react';

function Login() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    const data = {
      Email,
      Password,
      
      
    };
   // const [addSuccess , setAddSuccess] = useState(false);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${SECRET_KEY}`, 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const useful=await response.json()
        localStorage.setItem('auth',useful.token)

        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 2000); 
        
       
       
        //console.log('Login successful');
      } else {
       
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div>
    {addSuccess && (
        <div className='alert alert-success' role='alert'>
           Login successfully
         
        </div>
      )}
    </div>
      <h1>LOGIN FORM</h1>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email" 
            className="form-control"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label> 
          <input
            type="password"
            className="form-control"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 change">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;

// import React from 'react'

// function Login() {
//   return (
//     <>
//     <h1>LOGIN FORM</h1>
//     <br />
//     <br />
//     <form>
 
//   <div className="mb-3">
//     <label className="form-label">Email</label>
//     <input type="password" class="form-control"/>
//   </div>
//   <div className="mb-3">
    
//     <label  className="form-label">Passward</label>
//     <input type="email" class="form-control"/>
//   </div>
//   <div  className="d-grid gap-2 change"> 
//   <button type="button" class="btn btn-primary">Submit</button>
//   </div>
// </form>

//     </>
    


//   )
// }

// export default Login