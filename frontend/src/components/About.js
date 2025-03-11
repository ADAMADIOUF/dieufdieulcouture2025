import React from 'react'
import aboutImage from '../assets/firstbanner.png' // Import your image here

const About = () => {
  return (
    <section className='about-container'>
      <div className='about-content'>
        <div className='about-text'>
          <h2>À Propos de Dieuf Dieul Couture</h2>
          <p>
            Dieuf Dieul Couture est une maison de couture d'exception, fondée
            avec la passion de l’art africain et de l’élégance intemporelle.
            Nous nous distinguons par la fusion parfaite entre le traditionnel
            et le moderne, créant des vêtements qui célèbrent l'héritage
            culturel tout en apportant une touche de sophistication
            contemporaine.
          </p>
          <p>
            Chaque création que nous proposons est un hommage à l'Afrique, à ses
            tissus et à ses couturiers historiques. Nous nous engageons à
            promouvoir l'artisanat local en collaborant étroitement avec des
            artisans de talent, garantissant ainsi une qualité sans compromis
            dans chaque vêtement.
          </p>
          <p>
            Notre mission va au-delà de la simple création de vêtements. Nous
            cherchons à offrir à chaque client une expérience unique, en lui
            permettant de se sentir à la fois élégant et connecté à ses racines
            culturelles. À Dieuf Dieul Couture, chaque vêtement raconte une
            histoire, et chaque client devient une part de cette histoire.
          </p>
          <p>
            De plus, nous nous efforçons de rester à l’avant-garde des tendances
            tout en restant fidèles à nos valeurs fondamentales. Notre équipe de
            couturiers et stylistes travaille sans relâche pour garantir que
            chaque pièce soit une œuvre d'art, un mélange parfait de créativité
            et de savoir-faire.
          </p>
        </div>
        <div className='about-image'>
          <img src={aboutImage} alt='Dieuf Dieul Couture' />
        </div>
      </div>

      {/* Services Section */}
      <div className='services-section'>
        <h3>Nos Services</h3>
        <p>
          Nous proposons une gamme complète de services pour répondre aux
          besoins de chaque client. Que vous recherchiez un vêtement sur mesure
          ou des conseils en mode, nous vous garantissons des résultats qui
          surpasseront vos attentes.
        </p>
        <div className='services-list'>
          <div className='service-item'>
            <h4>Vêtements sur Mesure</h4>
            <p>
              Notre service de couture sur mesure permet à chaque client de
              vivre une expérience unique, avec des vêtements confectionnés
              spécifiquement pour leur morphologie et leurs goûts personnels.
              Chaque détail est pris en compte pour offrir un ajustement
              parfait.
            </p>
          </div>
          <div className='service-item'>
            <h4>Création de Collections</h4>
            <p>
              Nous concevons des collections uniques qui allient l'artisanat
              traditionnel et les influences contemporaines, créant ainsi des
              pièces intemporelles. Que ce soit pour une collection saisonnière
              ou une création exclusive, nous mettons l'accent sur l'originalité
              et l'authenticité.
            </p>
          </div>
          <div className='service-item'>
            <h4>Conception de Tenues de Mariage</h4>
            <p>
              Nous proposons des services de création de tenues de mariage
              entièrement sur mesure. Chaque tenue est confectionnée à partir de
              tissus de la plus haute qualité, avec des finitions parfaites et
              un design personnalisé pour chaque couple. Chaque mariée mérite de
              se sentir unique et exceptionnelle le jour de son mariage.
            </p>
          </div>
          <div className='service-item'>
            <h4>Consultation en Mode</h4>
            <p>
              Nos experts en mode sont là pour vous guider dans le choix des
              tenues qui correspondent à votre style, votre personnalité et vos
              occasions spéciales. Que ce soit pour une tenue de soirée, un
              événement professionnel ou une transformation complète de votre
              garde-robe, nous offrons des conseils personnalisés.
            </p>
          </div>
          <div className='service-item'>
            <h4>Réparation et Restauration de Vêtements</h4>
            <p>
              Nous offrons un service de réparation et de restauration pour
              redonner vie à vos vêtements préférés. Que ce soit pour ajuster
              une coupe, réparer des tissus ou restaurer un vêtement antique,
              nos artisans expérimentés sauront redonner à chaque pièce son
              éclat original.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
