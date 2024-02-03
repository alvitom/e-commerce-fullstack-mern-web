import React, { useEffect, useState } from "react";
import { Modal, List } from "@mantine/core";
import axios from "axios";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [modalSearch, setModalSearch] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (keyword.length >= 1) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASEURL}/products/search?keyword=${keyword}`);
          const data = await response.data;
          setProducts(data);
        } catch (error) {
          console.error("Error searching products:", error);
        }
      } else {
        setProducts([]);
      }
    };

    handleSearch();
  }, [keyword]);

  const highlightKeyword = (text) => {
    const startIndex = text.toLowerCase().indexOf(keyword.toLowerCase());
    const endIndex = startIndex + keyword.length;

    if (startIndex === -1) {
      return text;
    }

    const beforeKeyword = text.slice(0, startIndex);
    const duringKeyword = text.slice(startIndex, endIndex);
    const afterKeyword = text.slice(endIndex);

    return (
      <>
        {beforeKeyword}
        <mark>{duringKeyword}</mark>
        {afterKeyword}
      </>
    );
  };

  return (
    <>
      <button className="bg-transparent text-light border p-2 rounded w-25 me-auto d-flex align-items-center" onClick={() => setModalSearch(true)}>
        {/* <input className="form-control form-control" type="search" placeholder="Cari..." aria-label="Search" /> */}
        <i className="bi bi-search ms-2"></i>
        <span className="ms-3">Cari...</span>
      </button>
      <Modal
        opened={modalSearch}
        withCloseButton={false}
        onClose={() => {
          setModalSearch(false);
          setKeyword("");
        }}
      >
        <h3 className="text-center mt-2 mb-3">Cari Produk</h3>
        <div className="position-relative">
          <i className="bi bi-search" style={{ position: "absolute", top: "50%", left: "8px", transform: "translateY(-50%)" }}></i>
          <input type="search" className="form-control border-secondary w-100" placeholder="Cari..." value={keyword} onChange={(event) => setKeyword(event.target.value)} style={{ paddingLeft: "35px" }} data-autofocus />
        </div>
        <List className="mt-3">
          {products.map((product) => (
            <div key={product._id}>
              <a href={`/products/${product._id}`} className="btn btn-light mb-3 text-start w-100">
                {highlightKeyword(product.product_name)}
              </a>
            </div>
          ))}
        </List>
      </Modal>
    </>
  );
};

export default SearchProducts;
