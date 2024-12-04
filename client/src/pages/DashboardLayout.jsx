// import { Outlet } from "react-router-dom";
// import Wrapper from "../assets/wrappers/Dashboard";
// import { BigSidebar, Navbar, SmallSidebar } from "../components";
// import { createContext, useContext, useState } from "react";

// const DashboardContext = createContext();

// const DashboardLayout = () => {
//   // temp
//   const user = { name: "LAN" };
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleDarkTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//     console.log("toggle dark theme");
//   };

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   const logoutUser = async () => {
//     console.log("logout user");
//     // Implement logout functionality (e.g., clear session, redirect)
//   };

//   return (
//     <DashboardContext.Provider
//       value={{
//         user,
//         showSidebar,
//         isDarkTheme,
//         toggleDarkTheme,
//         toggleSidebar,
//         logoutUser,
//       }}
//     >
//       <Wrapper>
//         <main className="dashboard">
//           {/* Conditionally render the sidebar */}
//           {showSidebar ? <BigSidebar /> : <SmallSidebar />}
//           <div>
//             <Navbar />
//             <div className="dashboard-page">
//               <Outlet />
//             </div>
//           </div>
//         </main>
//       </Wrapper>
//     </DashboardContext.Provider>
//   );
// };

// export const useDashboardContext = () => useContext(DashboardContext);

// export default DashboardLayout;

// import { Outlet } from "react-router-dom";

// import Wrapper from "../assets/wrappers/Dashboard";
// import { Navbar, BigSidebar, SmallSidebar } from "../components";

// const Dashboard = () => {
//   return (
//     <Wrapper>
//       <main className="dashboard">
//         <SmallSidebar />
//         <BigSidebar />
//         <div>
//           <Navbar />
//           <div className="dashboard-page">
//             <Outlet />
//           </div>
//         </div>
//       </main>
//     </Wrapper>
//   );
// };

// export default Dashboard;

import { Outlet } from "react-router-dom";

import Wrapper from "../assets/wrappers/Dashboard";
import { Navbar, BigSidebar, SmallSidebar } from "../components";

import { useState, createContext, useContext } from "react";
const DashboardContext = createContext();
const Dashboard = () => {
  // temp
  const user = { name: "john" };

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleDarkTheme = () => {
    console.log("toggle dark theme");
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log("logout user");
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
