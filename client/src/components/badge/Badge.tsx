import React from 'react'
import "./Badge.css"
interface BadgeType {
    type:string,
    text:string
}

function Badge({type,text}:BadgeType) {
    
 let badgeClass = "badge";
 if(type == "red") {
    badgeClass+= " red"
 }
 if(type == "green") {
    badgeClass+= " green"
 }
  return (
    <div className={badgeClass}>
       {text}
    </div>
  )
}

export default Badge