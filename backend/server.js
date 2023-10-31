const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  SECRET_KEY  = require('./config');


const port = process.env.PORT || 5000;
const User = require('./usermodel');
const Sales = require('./salesmodel');
const cors = require('cors');
const checkLogin=require('./middleware')


app.use(cors());
mongoose.connect('mongodb://0.0.0.0:27017/salesapp',{ useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });



app.post('/api/register', async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  try {
    const existingUser = await User.findOne({ Email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const data = new User({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword
    });
    console.log(data)

   const result= await data.save();
     //res.send(result)
    //console.log("user succesful")

    return res.status(201).json({ message: 'User registration successful.',result });
  } catch (error) {
    return  res.status(500).json({ message: 'Registration failed. Please try again later.' });
   // console.log('registration failed',error)
  }
});

app.post('/api/login', async  (req,res) => {

  

  try {
    const {Email,Password} = req.body;
   
    
    const use = await User.findOne({Email});
    console.log(SECRET_KEY.SECRET_KEY)
   

    if (!use) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    else{
      try {
        if (await bcrypt.compare(Password, use.Password )) {
          const token = jwt.sign({ userId: use._id, email: use.Email }, SECRET_KEY.SECRET_KEY, {
              expiresIn: '1h', 
             });
             return res.status(200).json({ message: 'Authentication successful', token:token });
          
          
        }
        else{
          res.status(402).json({message:'not'})
        }
        
      } catch (error) {
        res.status(402).json({message:"errorbcrypt"})
        
      }
      
    }

    

   
  } catch (error) {
    return res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
});

 


app.post('/api/sales',checkLogin, async (req, res) => {
  const { ProductName, Quantity, Amount } = req.body;

  try {
    const data = new Sales({
      ProductName,
      Quantity,
      Amount,
    });

    const result=await data.save();
    //res.send ("sales added succesfully",result)

    return res.status(201).json({ message: 'Sales entry added successfully.',result });
  } catch (error) {
    
    return res.status(500).json({ message: 'Failed to add sales entry. Please try again later.' });
  }
});

app.get('/api/top-sales', checkLogin, async (req, res) => {
  try {
    
    const topSales = await Sales.find({})
      .sort({ Amount: -1 })
      .limit(5);

    return res.status(200).json(topSales);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve top sales entries.' });
  }
});
app.get('/api/total-revenue', checkLogin, async (req, res) => {
  try {
    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    // Calculate the total revenue for today by summing the 'Amount' field of sales entries
    const TotalRevenue = await Sales.aggregate([
      {
        $match: {
          date: {
            $gte: today, // Filter for entries with a date greater than or equal to today
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$Amount' },
        },
      },
    ]);

    if (TotalRevenue.length > 0) {
      return res.status(200).json({ totalRevenue: TotalRevenue[0].total });
    } else {
      return res.status(404).json({ message: 'No sales entries found for today.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Failed to calculate total revenue for today.' });
  }
});
// app.get('/api/total-revenue', checkLogin, async (req, res) => {
//   try {
//     // Get the current date
//     const today = new Date();
//     today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

//     // Calculate the total revenue for today by summing the 'amount' field of sales entries
//     const TotalRevenue = await Sales.aggregate([
//       {
//         $match: {
//           date: {
//             $gte: today, 
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: '$Amount' },
//         },
//       },
//     ]);

//     if (TotalRevenue.length > 0) {
//       return res.status(200).json({ totalRevenue: TotalRevenue[0].total });
//     } else {
//       return res.status(404).json({ message: 'No sales entries found for today.' });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: 'Failed to calculate total revenue for today.' });
//   }
// });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
