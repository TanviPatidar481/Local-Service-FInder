import { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    location: "",
    phone: ""
  });

  const handleSignup = async () => {
    await axios.post("/user/signup", {
      email: form.email,
      password: form.password,
      role: "customer"
    });
    setStep(2);
  };

  const handleOnboard = async () => {
    await axios.post("/user/onboard/customer", {
      name: form.name,
      location: form.location,
      phone: form.phone
    });
    navigate("/dashboard");
  };

  return (
    <div>
      {step === 1 && (
        <>
          <h2>Signup</h2>
          <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
          <input placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
          <button onClick={handleSignup}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Complete Profile</h2>
          <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
          <input placeholder="Location" onChange={e=>setForm({...form,location:e.target.value})}/>
          <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
          <button onClick={handleOnboard}>Finish</button>
        </>
      )}
    </div>
  );
}