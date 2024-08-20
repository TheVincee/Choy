/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateModal = ({ isOpen, toggleModal, updateProduct, setProduct, product }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct();
  };

  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton className="bg-dark text-light border-bottom border-light">
        <Modal.Title className="text-uppercase fw-bold text-light">Update Product</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="bg-dark text-light">
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label className="text-light">Name</Form.Label>
            <Form.Control
              type="text"
              name="Name"
              value={product.Name || ""}
              onChange={handleChange}
              required
              className="bg-dark text-light border-light"
              placeholder="Enter new product name"
            />
          </Form.Group>
          <Form.Group controlId="formSku" className="mb-3">
            <Form.Label className="text-light">SKU</Form.Label>
            <Form.Control
              type="text"
              name="sku"
              value={product.sku || ""}
              onChange={handleChange}
              required
              className="bg-dark text-light border-light"
              placeholder="Enter new SKU"
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label className="text-light">Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              required
              className="bg-dark text-light border-light"
              placeholder="Enter new price"
            />
          </Form.Group>
          <Form.Group controlId="formQuantity" className="mb-3">
            <Form.Label className="text-light">Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={product.quantity || ""}
              onChange={handleChange}
              required
              className="bg-dark text-light border-light"
              placeholder="Enter new quantity"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-top border-light">
          <Button variant="outline-light" onClick={toggleModal} className="text-uppercase fw-bold">
            Close
          </Button>
          <Button variant="light" type="submit" className="text-uppercase fw-bold" style={{ backgroundColor: "#ffffff", color: "#000000", borderColor: "#ffffff" }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateModal;
