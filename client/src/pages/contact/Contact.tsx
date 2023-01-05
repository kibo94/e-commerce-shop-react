import React, { useRef , useState } from "react";
import "./Contact.scss";

import emailjs from "@emailjs/browser";
import { checkAllFieldsAreValid } from "../../utils/utils";
export function Contact() {
  const templatId = "template_4t5v9r6";
  const publicKey = "PT-wAj6E7mOK3mpqM";
  const serviceId = "service_4hto9qi";
  const [contactData,setContactData] = useState( {
    user_name:{
      touched:false,
      value : false
    },
    user_email:{
      touched:false,
      value : false
    },
    message:{
      touched:false,
      value : false
    },

  })
  const form = useRef<any>(null);
  const onLoginSubmit = (e: any) => {
    e.preventDefault();

    const inputs = Array.from(form.current.children).slice(
      0,
      form.current.children.length - 1
    );
   
    emailjs.sendForm(serviceId, templatId, form.current, publicKey).then(
      (result) => {
        console.log(result)
      },
      (error) => {}
    );
    inputs.forEach((input: any) => (input.value = ""));
  };
  const onChangeContact  = (e:any) =>   setContactData({...contactData,[e.target.name]:{value:e.target.value.length > 0,touched:true}});
  console.log(contactData)
  return (
    <div className="contact form">
      <form ref={form} onSubmit={onLoginSubmit}>
        <input  onChange={onChangeContact} type="text" name="user_name" placeholder="Full Name" />
        {contactData.user_name.touched  && !contactData.user_name.value ? <p className="err">Name  can't be empty</p> : null} 
        <input onChange={onChangeContact} type="email" name="user_email" placeholder="Email" />
        {contactData.user_email.touched  && !contactData.user_email.value ? <p className="err">Email  can't be empty</p> : null} 
        <textarea onChange={onChangeContact} name="message" placeholder="Message..." />
        {contactData.message.touched  && !contactData.message.value? <p className="err">Message  can't be empty</p> : null} 
        <input disabled={ !checkAllFieldsAreValid(contactData)} type="submit" value="Send" className="send" />
      </form>
    </div>
  );
}

export default Contact;
