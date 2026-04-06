import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "null");
  const businessBasicInfo = JSON.parse(localStorage.getItem("businessBasicInfo") || "null");
  const businessLocation = JSON.parse(localStorage.getItem("businessLocation") || "null");

  const isBusinessUser = !!businessBasicInfo || !!businessLocation;

  const detectedCity =
    userProfile?.city ||
    businessLocation?.city ||
    "Your City";

  const [selectedCity, setSelectedCity] = useState(detectedCity);
  const [searchTerm, setSearchTerm] = useState("");

  const sections = useMemo(
    () => [
      {
        title: "Education",
        bg: "bg-[#f3e0d4]",
        items: [
          { name: "Academic Tutors", icon: "📘" },
          { name: "Schools", icon: "🏫" },
          { name: "Kids Activity", icon: "🎨" },
          { name: "Colleges", icon: "🎓" },
        ],
      },
      {
        title: "Services",
        bg: "bg-[#efe5cd]",
        items: [
          { name: "Technicians", icon: "🔧" },
          { name: "Cleaning", icon: "🧹" },
          { name: "Security", icon: "🛡️" },
          { name: "Event Organizers", icon: "🎉" },
        ],
      },
      {
        title: "Sports & More",
        bg: "bg-[#dfe9d7]",
        items: [
          { name: "Sports Coach", icon: "🏅" },
          { name: "Fitness", icon: "💪" },
          { name: "Indoor Games", icon: "🏓" },
          { name: "Workshops", icon: "🧠" },
        ],
      },
    ],
    []
  );

  const handleSearch = () => {
    alert(
      `Search clicked for "${searchTerm || "all services"}" in ${selectedCity}`
    );
  };

  const handleListBusiness = () => {
    navigate("/onboarding/business-signup");
  };

  const handleProfileClick = () => {
    alert(
      isBusinessUser
        ? "Service provider profile area"
        : "User profile area"
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Hero Section */}
      <div className="bg-gradient-to-b from-[#2f2f6d] via-[#24184f] to-[#2b0040] pb-24">
        {/* Navbar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-xl text-white hover:bg-white/10"
            >
              <span className="text-2xl leading-none">☰</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-yellow-300 to-red-500 text-lg font-bold text-white shadow">
                L
              </div>
              <div className="text-2xl font-semibold text-white">
                LocalBuddy AI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleListBusiness}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow hover:bg-slate-100"
            >
              List Your Business
            </button>

            <button
              type="button"
              onClick={handleProfileClick}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow hover:bg-slate-100"
            >
              👤
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-7xl px-6 pt-10 text-center md:px-10">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Find Trusted Local Services
          </h1>

          <p className="mt-4 text-xl text-white/90 md:text-2xl">
            Discover top providers in <span className="font-bold">{selectedCity}</span>
          </p>

          <p className="mt-3 text-2xl font-bold text-orange-300 md:text-3xl">
            Smart, Nearby, Reliable!
          </p>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 md:w-1/3 md:border-b-0 md:border-r">
              <span className="text-xl">📍</span>
              <input
                type="text"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="Enter city"
                className="w-full border-none bg-transparent text-base outline-none"
              />
            </div>

            <div className="flex items-center gap-3 px-5 py-4 md:w-2/3">
              <span className="text-xl">🔎</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Find your service"
                className="w-full border-none bg-transparent text-base outline-none"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="mx-auto -mt-16 max-w-7xl px-6 pb-12 md:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`rounded-3xl ${section.bg} overflow-hidden shadow-sm`}
            >
              <div className="px-6 py-6 text-center text-2xl font-bold text-slate-900">
                {section.title}
              </div>

              <div className="bg-white/30 px-5 py-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                        {item.icon}
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-800">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button
                    type="button"
                    className="text-base font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional role note */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
          Logged in as:{" "}
          <span className="font-semibold text-slate-900">
            {isBusinessUser ? "Service Provider" : "User"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;