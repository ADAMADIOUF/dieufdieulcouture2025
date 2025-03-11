import mongoose from 'mongoose'
import sendEmail from '../utils/sendEmail.js'

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    productName: {
      type: String,
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
)

contactSchema.post('save', async function (doc) {
  const emailOptions = {
    to: 'pacowefor253@gmail.com',
    subject: 'Nouvelle soumission du formulaire de contact',
    message: `
      Prénom : ${doc.firstName}
      Nom : ${doc.lastName}
      Téléphone : ${doc.phone}
      Description : ${doc.description}
      Adresse : ${doc.address}
      Prix total : ${doc.totalPrice}
      Nom du produit : ${doc.productName}
    `,
  }

  try {
    await sendEmail(emailOptions)
    console.log('Email de notification envoyé avec succès.')
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de notification :", error)
  }
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
