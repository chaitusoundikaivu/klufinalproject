import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';  // Import the CSS file

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_tbrw4hh', 'template_wrhuiud', form.current, {
        publicKey: 's-0vclYA8bgqu6KiP',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          console.log('message sent');
        },
        (error) => {
          console.log('FAILED...', error.text);
          console.log('message not sent');
        },
      );
  };

  const notify = () => toast('Mail sent successfully!');

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="user_name" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="user_email" />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" />
        </div>
        <div className="form-group">
          <input type="submit" onClick={notify} value="Send" />
        </div>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Contact;
