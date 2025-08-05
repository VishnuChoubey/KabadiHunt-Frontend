import React, { useState } from 'react';
import '../style/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSuccess('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact-us/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          message: ''
        });
        setSuccess("Your request has been sent to us. Thanks for contacting us!");
        setError('');
      } else {
        setError("Failed to send your message. Please try again.");
        setSuccess('');
      }
    } catch (err) {
      setError("Error: Could not send your message.");
      setSuccess('');
    }
  };

  return (
    <div className="contact-bg">
      <div className="contact-center-wrap">
        <div className="contact-card">
          <div className="contact-separator"></div>
          <h2 className="contact-title">Contact Us</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Your Phone</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="Phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message"
                  required
                  style={{ minHeight: '80px', resize: 'vertical' }}
                />
              </div>
            </div>
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="contact-btn">SEND MESSAGE</button>
          </form>
          <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '2rem', paddingTop: '1.2rem', alignItems: 'center' }}>
            <h3 className="contact-title" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Contact Information</h3>
            <div style={{ margin: '1rem 0', color: '#2563eb', fontWeight: 500, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', background: '#f0f9ff' }}>
              <div style={{ marginBottom: '0.7rem' }}>
                <i className="fa fa-map-marker" />&nbsp; Greater Noida, 201503
              </div>
              <div style={{ marginBottom: '0.7rem' }}>
                <i className="fa fa-phone" />&nbsp; +91 9939940039
              </div>
              <div style={{ marginBottom: '0.7rem' }}>
                <i className="fa fa-envelope" />&nbsp; vishnuchoubey9939@gmail.com
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '1.2rem', justifyContent: 'center' }}>
              <i className="fa fa-linkedin-square" style={{ border: '1px solid #2563eb', padding: '8px', borderRadius: '50%', color: '#2563eb', fontSize: '1.3rem', cursor: 'pointer' }}></i>
              <i className="fa fa-instagram" style={{ border: '1px solid #2563eb', padding: '8px', borderRadius: '50%', color: '#2563eb', fontSize: '1.3rem', cursor: 'pointer' }}></i>
              <i className="fa fa-facebook-f" style={{ border: '1px solid #2563eb', padding: '8px', borderRadius: '50%', color: '#2563eb', fontSize: '1.3rem', cursor: 'pointer' }}></i>
              <i className="fa fa-whatsapp" style={{ border: '1px solid #2563eb', padding: '8px', borderRadius: '50%', color: '#2563eb', fontSize: '1.3rem', cursor: 'pointer' }}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;