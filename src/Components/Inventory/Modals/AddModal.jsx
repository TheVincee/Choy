import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddModal({ isOpen, addProduct, setProduct, product, toggleModal }) {
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton className="bg-dark text-white border-bottom border-light">
        <Modal.Title className="text-uppercase fw-bold">Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form onSubmit={addProduct}>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label className="text-light">Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={product.Name}
              onChange={handleChange}
              required
              className="bg-dark text-light border-2 border-light"
              placeholder="Enter product name"
            />
          </Form.Group>
          <Form.Group controlId="formProductSku" className="mb-3">
            <Form.Label className="text-light">SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              required
              className="bg-dark text-light border-2 border-light"
              placeholder="Enter product SKU"
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mb-3">
            <Form.Label className="text-light">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="bg-dark text-light border-2 border-light"
              placeholder="Enter product price"
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity" className="mb-3">
            <Form.Label className="text-light">Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
              className="bg-dark text-light border-2 border-light"
              placeholder="Enter product quantity"
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button
              variant="outline-light"
              onClick={toggleModal}
              className="fw-bold text-uppercase"
              style={{ borderColor: "#ffffff" }}
            >
              Close
            </Button>
            <Button
              variant="light"
              type="submit"
              className="fw-bold text-uppercase"
              style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#ffffff" }}
            >
              Add Product
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
