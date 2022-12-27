export interface User {
    userName:string,
    password:string,
    id:any
  }

export interface ProductPrice {
  price:number,
  oldPrice:number,
  newPrice:number,
  qunantity:number,
  currency:string
}
  export interface Product {
     id:number,
     name:string,
     slug:number,
     price:ProductPrice,
    
  }
export interface Info{
  decr:string,
  driverLicence:boolean,
}
 export interface MyUser {
   name:string,
   age:number,
   carName?:any,
   info:Info

   
 } 
 