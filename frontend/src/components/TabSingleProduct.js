const TabSingleProduct = ({ name, price, description, activeTab, reviews }) => {
  return (
    <div className='tab-container'>
      {/* Description Tab */}
      <div
        className={`tab-panel ${activeTab === 'description' ? 'active' : ''}`}
      >
        <h3>Description</h3>
        <p>{description || 'No description available'}</p>
      </div>

      {/* Product Info Tab */}
      <div className={`tab-panel ${activeTab === 'info' ? 'active' : ''}`}>
        <h3>Product Info</h3>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Price:</strong> ${price}
        </p>
      </div>

      {/* Reviews Tab */}
      <div className={`tab-panel ${activeTab === 'reviews' ? 'active' : ''}`}>
        <h3>Reviews</h3>
        {reviews && reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <strong>{review.username}:</strong>
                <p>{review.comment}</p>
                <p>Rating: {review.rating} stars</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  )
}

export default TabSingleProduct
