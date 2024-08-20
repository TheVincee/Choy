import Header from "./Header/Header";
import { useState, useEffect } from "react";
import { fetchData as apiFetchData } from "./utilities/ApiUti";
import FilterTable from "./Components/Dashboard/Table/FilterTable";
import Products from "./Components/Dashboard/Table/Products";
import { FaMinus, FaPlus } from "react-icons/fa"; // Importing the correct icons
import { Toast, ToastContainer } from "react-bootstrap";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success"); // 'success' or 'danger'

  const PRODUCTS_API_URL = "http://localhost:5179/api/ProductApi/GetProducts";
  const ORDER_API_URL = "http://localhost:5179/api/Order/Checkout"; // Updated URL

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await apiFetchData(PRODUCTS_API_URL, "GET");
      const productsWithOriginalQuantity = result.map((product) => ({
        ...product,
        originalQuantity: product.quantity,
      }));
      setProducts(productsWithOriginalQuantity);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToSelectedProducts = (product) => {
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const incrementQuantity = (productId) => {
    setSelectedProducts((prevSelected) => {
      const product = prevSelected.find((p) => p.id === productId);
      if (!product) return prevSelected;

      if (product.quantity < product.originalQuantity) {
        const updatedSelected = prevSelected.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );

        const updatedProducts = products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );

        setProducts(updatedProducts);
        return updatedSelected;
      }
      return prevSelected;
    });
  };

  const decrementQuantity = (productId) => {
    setSelectedProducts((prevSelected) => {
      const product = prevSelected.find((p) => p.id === productId);
      if (!product) return prevSelected;

      if (product.quantity > 1) {
        const updatedSelected = prevSelected.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );

        const updatedProducts = products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );

        setProducts(updatedProducts);
        return updatedSelected;
      } else {
        const updatedSelected = prevSelected.filter((p) => p.id !== productId);

        const updatedProducts = products.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );

        setProducts(updatedProducts);
        return updatedSelected;
      }
    });
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert("No products selected for checkout.");
      return;
    }

    try {
      const response = await fetch(ORDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProducts),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      const data = await response.json();
      console.log("Order ID:", data.OrderId);

      setSelectedProducts([]);
      showToastMessage("Order placed successfully!", "success");
    } catch (error) {
      console.error("Checkout failed:", error);
      showToastMessage("Checkout failed. Please try again.", "danger");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 p-4 rounded border border-3 border-dark shadow-lg bg-light">
            <h2 className="h5 mb-4 text-dark">Selected Products</h2>
            {selectedProducts.length === 0 ? (
              <p className="text-muted">No products selected</p>
            ) : (
              <>
                <ul className="list-unstyled">
                  {selectedProducts.map((product) => (
                    <Products
                      key={product.id}
                      product={product}
                      incrementQuantity={() => incrementQuantity(product.id)}
                      decrementQuantity={() => decrementQuantity(product.id)}
                    />
                  ))}
                </ul>
                <div className="mt-3 fw-bold text-dark">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <button
                  className="mt-3 w-100 btn btn-dark"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </>
            )}
          </div>

          <div className="col-md-8 p-4 rounded border border-3 border-dark shadow-lg bg-light">
            <h1 className="h4 mb-3 text-dark">Products</h1>
            <input
              type="text"
              className="form-control mb-3 border border-dark text-dark bg-light"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
              <p className="text-center text-dark">Loading...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-danger">No products found</p>
            ) : (
              <div className="row">
                {filteredProducts.map((product) => (
                  <div className="col-md-4 mb-3" key={product.id}>
                    <FilterTable
                      product={product}
                      addToSelectedProducts={() =>
                        addToSelectedProducts(product)
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastType}>
          <Toast.Header>
            <strong className="me-auto text-dark">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-dark">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
