import React from 'react'
import "./Badge.css"
interface PriceBadgeProps {
    price:number
}
function PriceBadge({price}:PriceBadgeProps) {
  return (
    <div className='badge priceBadge'>{price} rsd</div>
  )
}

export default PriceBadge