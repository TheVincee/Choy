// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const DeleteModal = ({ isOpen, toggleModal, handleDeleteProduct }) => {
  return (
    <Modal show={isOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton className="bg-dark text-light border-bottom-0">
        <Modal.Title className="text-light fw-bold">Delete Product?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center bg-dark text-light">
       
        <p className="text-light mb-4">Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer className="justify-content-center bg-dark border-top-0">
        <Button
          variant="outline-light"
          onClick={toggleModal}
          className="rounded-pill px-4"
        >
          Cancel
        </Button>
        <Button
          variant="outline-light"
          onClick={handleDeleteProduct}
          className="rounded-pill px-4 ms-2"
          style={{ borderColor: '#ffffff', color: '#ffffff' }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
