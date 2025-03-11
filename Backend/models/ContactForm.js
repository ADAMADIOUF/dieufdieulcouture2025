import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: false, // Le rendre optionnel
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
)

contactFormSchema.post('save', async function (doc) {
  const emailOptions = {
    to: 'pacowefor253@gmail.com',
    subject: 'Nouvelle soumission de formulaire de contact',
    message: `
      Nom : ${doc.name}
      Numéro de téléphone : ${doc.phoneNumber}
      Nom de l'entreprise : ${doc.companyName}
      Email : ${doc.email}
      Message : ${doc.message}
    `,
  }

  try {
    await sendEmail(emailOptions)
    console.log('Email de notification envoyé avec succès.')
  } catch (error) {
    console.error('Erreur lors de l’envoi de l’email de notification :', error)
  }
})

const ContactForm = mongoose.model('ContactForm', contactFormSchema)

export default ContactForm
