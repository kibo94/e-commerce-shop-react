import React, { useRef } from "react";
import "./Contact.scss";

import emailjs from "@emailjs/browser";
export function Contact() {
  const apiKey = "d35132bd61984fa6b34ea7c10009ab22";
  const templatId = "template_4t5v9r6";
  const publicKey = "PT-wAj6E7mOK3mpqM";
  const serviceId = "service_4hto9qi";

  //   const emailRef = useRef<HTMLInputElement>(null);
  //   const messageRef = useRef<HTMLTextAreaElement>(null);
  const form = useRef<any>(null);
  const onLoginSubmit = (e: any) => {
    e.preventDefault();

    const inputs = Array.from(form.current.children).slice(
      0,
      form.current.children.length - 1
    );
    inputs.forEach((input: any) => (input.value = ""));
    emailjs.sendForm(serviceId, templatId, form.current, publicKey).then(
      (result) => {},
      (error) => {}
    );
    inputs.forEach((input: any) => (input.value = ""));
  };

  return (
    <div className="contact form">
      <form ref={form} onSubmit={onLoginSubmit}>
        <input type="text" name="user_name" placeholder="Full Name" />
        <input type="email" name="user_email" placeholder="Email" />
        <textarea name="message" placeholder="Message..." />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default Contact;
