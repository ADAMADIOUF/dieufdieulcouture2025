import express from 'express'
import { contactFormData, contactFormDataTwo } from '../controllers/contactController.js'

const router = express.Router()

router.post('/', contactFormData)
router.post('/contactForm', contactFormDataTwo)

export default router
