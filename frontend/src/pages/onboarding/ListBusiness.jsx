import { useState } from "react";
import axios from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function ListBusiness() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    business_name: "",
    category: "",
    description: ""
  });

  const handleSignup = async () => {
    await axios.post("/user/signup", {
      email: form.email,
      password: form.password,
      role: "provider"
    });
    setStep(2);
  };

  const handleOnboard = async () => {
    await axios.post("/user/onboard/provider", form);
    navigate("/dashboard");
  };

  return (
    <div>
      {step === 1 && (
        <>
          <h2>Register Business</h2>
          <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button onClick={handleSignup}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Business Details</h2>
          <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
          <input placeholder="Location" onChange={e=>setForm({...form,location:e.target.value})}/>
          <input placeholder="Business Name" onChange={e=>setForm({...form,business_name:e.target.value})}/>
          <input placeholder="Category" onChange={e=>setForm({...form,category:e.target.value})}/>
          <input placeholder="Description" onChange={e=>setForm({...form,description:e.target.value})}/>
          <button onClick={handleOnboard}>Finish</button>
        </>
      )}
    </div>
  );
}