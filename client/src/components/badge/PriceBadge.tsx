import React from 'react'
import "./Badge.scss"
interface PriceBadgeProps {
    price:number
}
function PriceBadge({price}:PriceBadgeProps) {
  return (
    <div className='badge priceBadge'>{price} rsd</div>
  )
}

export default PriceBadge