import React, { useRef , useState } from "react";
import "./Contact.scss";

import emailjs from "@emailjs/browser";
import { checkAllFieldsAreValid, validateField } from "../../utils/utils";
export function Contact() {
  const templatId = "template_4t5v9r6";
  const publicKey = "PT-wAj6E7mOK3mpqM";
  const serviceId = "service_4hto9qi";
  const [contactData,setContactData] = useState( {
    username:{
      touched:false,
      message : ""
    },
    email:{
      touched:false,
      message : ""
    },
    message:{
      touched:false,
      message : ""
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
      },
      (error) => {}
    );
    inputs.forEach((input: any) => (input.value = ""));
  };
  const onChangeContact  = (e:any) =>  {
    setContactData({
      ...contactData,
      [e.target.name]: {
        touched: true,
        message: validateField(e.target.name, e.target.value),
      },
    })
  }
  return (
    <div className="contact form">
      <form ref={form} onSubmit={onLoginSubmit}>
        <input  onChange={onChangeContact} type="text" name="username" placeholder="Full Name"   className={contactData.username.message.length > 0 ? "err" : ""} />
        {contactData.username.touched  && contactData.username.message.length > 0 ? <p className="err">{contactData.username.message}</p> : null}
        <input className={contactData.email.message.length > 0 ? "err" : ""} onChange={onChangeContact} type="email" name="email" placeholder="Email" />
        {contactData.email.touched  && contactData.email.message.length > 0 ? <p className="err">{contactData.email.message}</p> : null} 
        <textarea className={contactData.message.message.length > 0 ? "err" : ""} onChange={onChangeContact} name="message" placeholder="Message..." />
        {contactData.message.touched  && contactData.message.message.length > 0 ? <p className="err">{contactData.message.message}</p> : null} 
        <input disabled={ !checkAllFieldsAreValid(contactData)} type="submit" value="Send" className="send" />
      </form>
    </div>
  );
}

export default Contact;
