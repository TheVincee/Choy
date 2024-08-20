import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function Products({ product, decrementQuantity, incrementQuantity }) {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center mb-3 rounded-3 shadow-lg p-3"
      style={{
        border: '2px solid #000', // Black border
        backgroundColor: '#fff', // White background
      }}
    >
      <span
        style={{
          fontFamily: 'Courier, monospace', // Courier font for a clean, fixed-width look
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: '#000', // Black text
        }}
      >
        {product.name} - ${product.price} x {product.quantity}
      </span>
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-dark"
          size="sm"
          className="p-2 rounded-circle border-2"
          onClick={decrementQuantity}
        >
          <FaMinus style={{ fontSize: '1.2rem', color: '#000' }} />
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          className="p-2 rounded-circle border-2"
          onClick={incrementQuantity}
        >
          <FaPlus style={{ fontSize: '1.2rem', color: '#000' }} />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
