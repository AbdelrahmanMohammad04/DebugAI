import React from 'react'
import './styles/Form.css'
import emailjs from 'emailjs-com';

const Form = () => {
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_4dd8o3f', 'template_76vyc1d', e.target, '_DQxG6jef_ZvFDPuw').then(res=>{
            console.log(res);
        }).catch(err => console.log(err));
        window.location.reload();
    }
  return (
    <>

    <div className='suggest'>Let us know your questions, suggestions and concerns by filling out the form below.</div>
    <form onSubmit={sendEmail}>
    <div className='name'>
    <input type='text' name='firstname' id="" placeholder='First Name'/>
    <input type='text' name="lastname" id=""  placeholder='Last Name'/>
    </div>
    <input type='email' name='email' id="" placeholder='Email Address'/>
    <input type='phone' name='number' id="" placeholder='Phone Number'/>
    <textarea name='message' id='' placeholder='Message here'/>
    <button className="sub" type='submit'>Submit</button>
    </form>


    </>
  )
}

export default Form