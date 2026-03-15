import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth-shared.css";
import axios from "axios";

const PartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phone.value;
    const password = e.target.password.value;
    const address = e.target.address.value;
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/foodpartner/register",
        {
          name: businessName,
          contactName,
          email,
          phoneNumber,
          password,
          address,
        },
        {
          withCredentials: true,
        },
      );
      
      // Save Partner info to local storage so the Home feed allows access
      if (response.data && response.data.foodPartner) {
        localStorage.setItem("partnerId", response.data.foodPartner.id);
        localStorage.setItem("token", response.data.token || "mock_token");
      }

      console.log("Partner registration successful!");
      
      // Redirect to the main feed
      navigate("/home");
    } catch (error) {
      console.error("registration failed", error);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div
        className="auth-card"
        role="region"
        aria-labelledby="partner-register-title"
      >
        <header>
          <h1 id="partner-register-title" className="auth-title">
            Partner sign up
          </h1>
          <p className="auth-subtitle">
            Create your partner account to manage listings.
          </p>
        </header>

        <form className="auth-form" noValidate onSubmit={handleSubmit}> 
          <div className="field-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              placeholder="My Restaurant"
            />
          </div>

          <div className="field-group">
            <label htmlFor="contactName">Contact Name</label>
            <input
              id="contactName"
              name="contactName"
              type="text"
              placeholder="Your name"
            />
          </div>

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="business@example.com"
            />
          </div>

          <div className="field-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 00000-00000"
            />
          </div>

          <div className="field-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main Street, City, Country"
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/choose-register" className="auth-submit ghost">
              Back to Register
            </Link>
            <button type="submit" className="auth-submit primary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartnerRegister;
