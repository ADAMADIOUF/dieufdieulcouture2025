import asyncHandler from '../middleware/asyncHandler.js'
import Contact from '../models/Contact.js'
import ContactForm from '../models/ContactForm.js'

const contactFormData = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    description,
    address,
    totalPrice,
    productName,
   
  } = req.body

  try {
    // Create a new instance of Contact using the request body
    const contact = new Contact({
      firstName,
      lastName,
      phone,
      description,
      address,
      totalPrice,
      productName,
     
    })

    // Save the contact to the database
    const savedContact = await contact.save()

    res.status(201).json({
      success: true,
      data: savedContact,
    })
  } catch (error) {
    console.error('Error saving contact form data:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})
const contactFormDataTwo = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    message,
    companyName,
  } = req.body

  try {
    // Create a new instance of Contact using the request body
    const contact = new ContactForm({
      name,
      email,
      phoneNumber,
      message,
      companyName,
    })

    // Save the contact to the database
    const savedContact = await contact.save()

    res.status(201).json({
      success: true,
      data: savedContact,
    })
  } catch (error) {
    console.error('Error saving contact form data:', error)
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
})

export { contactFormData, contactFormDataTwo }
