"use client";

import LoginSignupModal from "@/components/common/login-signup-modal";
import SidebarPanel from "@/components/common/sidebar-panel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { createQueryString } from "@/utils/lib";
const DefaultHeader = ({ showSearch = false, data }) => {
  const [navbar, setNavbar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQ = decodeURIComponent(searchParams.get("key"));
  const { replace } = useRouter();

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchQuery = formData.get("search");
    const search = createQueryString(searchParams, { key: searchQuery, page: 1 });
    replace(`${pathname}?${search.toString()}`);
  };

  useEffect(() => {
    setSearchQuery(searchQ);
  }, [searchQ]);

  // Determine the image source
  const logoSrc = data;
  const isImage = typeof logoSrc === 'string' && (logoSrc.startsWith('http') || logoSrc.endsWith('.jpg') || logoSrc.endsWith('.png') || logoSrc.endsWith('.svg'));

  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu ${navbar ? "sticky slideInDown animated" : ""
          }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      {isImage ? (
                        <Image
                          width={46}
                          height={52}
                          src={logoSrc}
                          alt="Header Logo"
                        />
                      ) : (
                        <span>{logoSrc}</span> // Fallback to text if not a valid image URL
                      )}
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      {isImage ? (
                        <Image
                          width={46}
                          height={52}
                          src={logoSrc}
                          alt="Header Logo"
                        />
                      ) : (
                        <span>{logoSrc}</span> // Fallback to text if not a valid image URL
                      )}
                    </Link>
                  </div>
                  {/* End Logo */}
                </div>
              </div>
              {/* End .col-auto */}

              {showSearch && (
                <div className="search_area" style={{ width: "500px" }}>
                  <form onSubmit={handleSearch}>
                    <input
                      value={searchQuery}
                      name="search"
                      type="search"
                      className="form-control"
                      placeholder="What are you looking for?"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
              )}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {/* <a
                    href="#"
                    className="login-info d-flex align-items-center"
                    // data-bs-toggle="modal"
                    // data-bs-target="#loginSignupModal"
                    role="button"
                  >
                    <i className="far fa-user-circle fz16 me-2" />{" "}
                    <span className="d-none d-xl-block">Login / Register</span>
                  </a>
                  <Link
                    className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                    href="#"
                  >
                    Add Property
                    <i className="fal fa-arrow-right-long" />
                  </Link> */}
                  {/* <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      {/* <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div> */}
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default DefaultHeader;
