import React from 'react';
import Sidebar from '../../components/layout/admin/Sidebar';
import { Outlet } from 'react-router-dom';

function AdminHome() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHome;

// import React from 'react'
// import Sidebar from '../../components/layout/admin/Sidebar'
// import { Outlet } from "react-router-dom"

// function AdminHome() {
//   return (
//     <div className="h-screen flex flex-col">
//       <div className="flex flex-grow">
//         <Sidebar />
//         <div className="w-5/6 p-6">
//           <div className="h-[93vh] overflow-auto">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHome
