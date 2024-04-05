import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import imgLogo from './assets/imgGastromanager.png'
import './navegador.css'
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import {  Outlet, Link, useLocation, Navigate} from "react-router-dom"

const Layout = () => {
  return (
    <div className="App">
      <Navbar
        className="h-40  items-center  transparent-navbar"
        style={{ paddingTop: 30 }}
      >
        <div
          className="flex justify-center "
          style={{ flex: "1", marginRight: 20 }}
        >
          <Link
            to="/visualizar-usuarios"
            style={{ textDecoration: "none", color: "inherit" }}
            className="gastro"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={imgLogo}
                className="mr-1 h-12 md:h-12 sm:h-12"
                alt="Gastro Manager"
              />
              <div
                className="self-center text-base sm:text-base md:text-base font-semibold text-white"
                style={{ overflow: "hidden", color: "#E25500" }}
              >
                Gastro Manager
              </div>
            </div>
          </Link>
        </div>

        <div className="flex md:order-2 justify-center" style={{ flex: "1" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button className="cerrar p-0 h-12">
              <IconButton
                aria-label="delete"
                className="p-0"
                sx={{ color: "#FF8E4A" }}
              >
                <LogoutIcon />
              </IconButton>{" "}
              <span className="text-sm">Cerrar sesión</span>
            </Button>
            <Navbar.Toggle />
          </div>
        </div>

        <Navbar.Collapse className="fondo">
          <NavbarLink
            href="/visualizar-mesas"
            className={`Nav-link ${
              location.pathname === "/visualizar-mesas" ? "active" : ""
            }`}
          >
            {" "}
            MESAS
          </NavbarLink>
          <NavbarLink
            href="/visualizar-usuarios"
            className={`Nav-link ${
              location.pathname === "/visualizar-usuarios" ? "active" : ""
            }`}
          >
            USUARIOS
          </NavbarLink>
          <NavbarLink
            href="/visualizar-menus"
            className={`Nav-link ${
              location.pathname === "/visualizar-menus" ? "active" : ""
            }`}
          >
            MENU
          </NavbarLink>
          <NavbarLink
            href="/visualizar-platillos"
            className={`Nav-link ${
              location.pathname === "/visualizar-platillos" ? "active" : ""
            }`}
          >
            PLATILLOS
          </NavbarLink>
          <NavbarLink
            href="/visualizar-insumos"
            className={`Nav-link ${
              location.pathname === "/visualizar-insumos" ? "active" : ""
            }`}
          >
            INSUMOS
          </NavbarLink>
        </Navbar.Collapse>
      </Navbar>

      <hr style={{ marginBottom: 50, borderTop: "3px solid #FFDEB6" }} />

      <div
        className="auth-wrapper"
        style={{ height: "77.5vh", paddingBottom: 8 }}
      >
        <div className="auth-inner overflow-hidden items-center" style={{ maxHeight: "100%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
