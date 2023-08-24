import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  if (location.pathname === '/') {
    location.pathname = '/pokemon/1';
}
    return (
      <>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </>
    );
  }