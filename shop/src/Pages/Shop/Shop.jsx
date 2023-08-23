import React from "react";
import banner1 from "../../assets/images/shop/banner1.jpg";

import ShopPageSidebar from "../../components/ShopPageSidebar/ShopPageSidebar";
import Product from "../../components/Product/Product";

const Shop = () => {
  return (
    <>
      <main className="main">
        {/* Start of Breadcrumb */}
        <nav className="breadcrumb-nav">
          <div className="container">
            <ul className="breadcrumb bb-no">
              <li>
                <a href="demo1.html">Home</a>
              </li>
              <li>
                <a href="shop-banner-sidebar.html">Shop</a>
              </li>
              <li>3 Columns</li>
            </ul>
          </div>
        </nav>
        {/* End of Breadcrumb */}
        {/* Start of Page Content */}
        <div className="page-content">
          <div className="container">
            {/* Start of Shop Banner */}
            <div
              className="shop-default-banner banner d-flex align-items-center mb-5 br-xs"
              style={{
                backgroundImage: `url('${banner1}')`,
                backgroundColor: "#FFC74E",
              }}
            >
              <div className="banner-content">
                <h4 className="banner-subtitle font-weight-bold">
                  Accessories Collection
                </h4>
                <h3 className="banner-title text-white text-uppercase font-weight-bolder ls-normal">
                  Smart Wrist Watches
                </h3>
                <a
                  href="shop-banner-sidebar.html"
                  className="btn btn-dark btn-rounded btn-icon-right"
                >
                  Discover Now
                  <i className="w-icon-long-arrow-right" />
                </a>
              </div>
            </div>

            <div className="shop-content row gutter-lg mb-10">
              <ShopPageSidebar />
              <div className="main-content">
                <div className="product-wrapper row cols-md-3 cols-sm-2 cols-2">
                  <Product />
                </div>
                <div className="toolbox toolbox-pagination justify-content-between">
                  <p className="showing-info mb-2 mb-sm-0">
                    Showing<span>1-12 of 60</span>Products
                  </p>
                  <ul className="pagination">
                    <li className="prev disabled">
                      <a
                        href="#"
                        aria-label="Previous"
                        tabIndex={-1}
                        aria-disabled="true"
                      >
                        <i className="w-icon-long-arrow-left" />
                        Prev
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="next">
                      <a href="#" aria-label="Next">
                        Next
                        <i className="w-icon-long-arrow-right" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End of Shop Main Content */}
            </div>
            {/* End of Shop Content */}
          </div>
        </div>
        {/* End of Page Content */}
      </main>
    </>
  );
};

export default Shop;
