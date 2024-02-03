import { Breadcrumbs, Rating } from "@mantine/core";

const ProductList = ({ items, products }) => {
  return (
    <>
      {items ? (
        <Breadcrumbs separator=">" mt="xs" className="d-flex justify-content-center">
          {items}
        </Breadcrumbs>
      ) : null}
      <div className="row mt-4">
        {products.map((product) => (
          <div className="col-sm-4 col-md-3 col-xl-2 col-6" key={product._id}>
            <a href={`/products/${product._id}`} className="btn btn-light mx-3 p-2 my-2">
              <div className="card text-center" style={{ width: 10 + "rem" }}>
                <img src={product.image} className="card-img-top mx-auto d-block my-4" alt="Product 1" style={{ width: 100 + "px", height: 100 + "px" }} />
                <div className="card-body">
                  <h6 className="card-title" style={{ width: 130 + "px", overflow: "hidden", display: "inlineBlock", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.product_name}
                  </h6>
                  <p className="card-text my-3">Rp. {product.price.toLocaleString()}</p>
                  <Rating value={product.rating.rate} fractions={2} readOnly className="mx-auto my-2" />
                  <span>Stok: {product.stock}</span>
                  <br />
                  Terjual: {product.rating.count}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
