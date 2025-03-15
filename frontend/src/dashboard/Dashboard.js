import React, { useState } from 'react'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useGetAllproductsQuery } from '../slices/productApiSlice'
import { useGetOrdersQuery } from '../slices/orderApiSlice'
import { useGetUsersQuery } from '../slices/userApiSlice'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const TableauDeBord = () => {
  const [enStock, setEnStock] = useState('')

  // Récupération des données des produits
  const {
    data: produitsData,
    error: produitsErreur,
    isLoading: produitsChargement,
  } = useGetAllproductsQuery({ enStock })
  const produits = produitsData?.products || []
  const totalProduits = produits.length
  const nombreEnStock = produits.filter(
    (produit) => produit.countInStock > 0
  ).length

  // Récupération des données des commandes
  const {
    data: commandesData,
    error: commandesErreur,
    isLoading: commandesChargement,
  } = useGetOrdersQuery()
  const totalCommandes = commandesData?.length || 0
  const revenusTotaux = commandesData
    ? commandesData.reduce((somme, commande) => somme + commande.totalPrice, 0)
    : 0

  // Récupération des données des utilisateurs
  const {
    data: utilisateursData,
    error: utilisateursErreur,
    isLoading: utilisateursChargement,
  } = useGetUsersQuery()
  const totalUtilisateurs = utilisateursData?.length || 0

  // Données pour le graphique
  const data = {
    labels: [
      'Produits en stock',
      'Total des produits',
      'Total des commandes',
      'Revenus totaux',
      'Total des utilisateurs',
    ],
    datasets: [
      {
        label: 'Statistiques',
        data: [
          nombreEnStock,
          totalProduits,
          totalCommandes,
          revenusTotaux,
          totalUtilisateurs,
        ],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#6366f1',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Résumé du tableau de bord des stocks et des utilisateurs',
      },
    },
  }

  return (
    <div>
      <h2>Tableau de Bord de Gestion des Stocks</h2>
      {produitsChargement || commandesChargement || utilisateursChargement ? (
        <p>Chargement...</p>
      ) : produitsErreur || commandesErreur || utilisateursErreur ? (
        <p>Erreur lors du chargement des données</p>
      ) : (
        <>
          <ul>
            <li>Produits en stock : {nombreEnStock}</li>
            <li>Total des produits : {totalProduits}</li>
            <li>Total des commandes : {totalCommandes}</li>
            <li>Revenus totaux : ${revenusTotaux.toFixed(2)}</li>
            <li>Total des utilisateurs : {totalUtilisateurs}</li>
          </ul>
          <div style={{ width: '80%', margin: '0 auto' }}>
            <Bar data={data} options={options} />
          </div>
        </>
      )}
    </div>
  )
}

export default TableauDeBord
