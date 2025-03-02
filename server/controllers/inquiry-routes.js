const router = require('express').Router() // Import express and create a new router

const Inquiry = require('../models/inquiry') // Import the inquiries model

//POST - 'localhost:3000/api/inquiries' - create a new inquiry - User only
router.post('/', async (req, res) => {
  try {
    //get request body
    const { name, email, phone, address, services, description } = req.body

    // console.log(
    //   `From POST: ${name}, ${email}, ${phone}, ${address}, ${services}, ${description}`
    // )

    if (!Array.isArray(services) || services.length === 0) {
      return res.status(400).json({
        message: 'At least one service has to be selected!'
      })
    }

    if (!name || !email || !phone || !address || !services || !description) {
      // If any of the fields are missing
      return res.status(400).json({
        message: 'All Fields are Required!' // Return a 401 status code and a message
      })
    }

    //create a new inquiry object
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      address,
      services,
      description,
      status: 'New',
      adminNotes: ''
    })

    //save new inquiry to database
    await newInquiry.save()

    res.status(201).json({
      result: newInquiry,
      message: 'Inquiry was created successfully'
    })
  } catch (error) {
    //return a 500 status code and an error message
    res.status(500).json({
      Error: `${error.message}`
    })
  }
})

//GET All - 'localhost:3000/api/inquiries' - display all inquiries - Admin Only
router.get(
  '/',
  /* authenticateToken ,*/ async (req, res) => {
    try {
      const inquiries = await Inquiry.find()
      //get all inquiries from database

      if (inquiries.length === 0) {
        //no inquiries are found in the database
        return res.status(404).json({
          message: 'No inquiries are found!'
        })
      }
      res.status(200).json({
        //return a 200 status code and the inquiries
        result: inquiries,
        message: 'All inquiries are retrieved successfully' //return a success message
      })
    } catch (error) {
      //return a 500 status code and an error message
      res.status(500).json({
        Error: error.message
      })
    }
  }
)

//GET one - 'localhost:3000/api/inquiries/:id' - display one inquiry by ID - AdminOnly
router.get(
  '/:_id',
  /* authenticateToken ,*/ async (req, res) => {
    try {
      //get the inquiry ID from the request params
      const { _id } = req.params

      const inquiry = await Inquiry.findById(_id)

      //if no inquiry matches the given ID
      if (!inquiry) {
        return res.status(404).json({
          message: 'Inquiry not found!'
        })
      }

      res.status(200).json({
        result: inquiry,
        message: 'Inquiry was retrieved successfully'
      })
    } catch (error) {
      //return a 500 status code and an error message
      res.status(500).json({
        Error: error.message
      })
    }
  }
)

//Update one - 'localhost:3000/api/inquiries/:id' - update an inquiry by ID - Admin Only
router.put(
  '/:_id',
  /* authenticateToken ,*/ async (req, res) => {
    try {
      //get the inquiry ID from the request params
      const { _id } = req.params

      //get the updated inquiry fields from the request body
      const { status, adminNotes } = req.body

      const inquiryToBeUpdated = {
        status,
        adminNotes
      }

      //options: (Optional) An object specifying options such as new
      //new: If set to true, returns the modified document rather than the original. Defaults to false.
      const options = { new: true }
      //find the inquiry and update its fields
      const updatedInquiry = await Inquiry.findByIdAndUpdate(
        _id,
        inquiryToBeUpdated,
        options
      )

      if (!updatedInquiry) {
        return res.status(404).json({ message: 'Inquiry not found!' })
      }

      res.status(200).json({
        result: updatedInquiry,
        message: 'Inquiry was updated!'
      })
    } catch (error) {
      //return a 500 status code and an error message
      res.status(500).json({
        Error: error.message
      })
    }
  }
)

//Delete one - 'localhost:3000/api/inquiries/:id' - delete a inquiry by ID - Admin Only
router.delete(
  '/:_id',
  /* authenticateToken ,*/ async (req, res) => {
    try {
      //get the inquiry ID from the request params
      const { _id } = req.params

      //find inquiry by ID and delete it
      const inquiryToBeDeleted = await Inquiry.findByIdAndDelete(_id)

      if (!inquiryToBeDeleted) {
        return res.status(404).json({
          message: 'No inquiry was found'
        })
      }
      res.status(200).json({
        result: inquiryToBeDeleted,
        message: `Inquiry from "${inquiryToBeDeleted.name}" was deleted successfully.`
      })
    } catch (error) {
      //return a 500 status code and an error message
      res.status(500).json({
        Error: error.message
      })
    }
  }
)

module.exports = router
