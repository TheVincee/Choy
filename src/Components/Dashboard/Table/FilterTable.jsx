import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function FilterTable({ product, addToSelectedProducts }) {
  return (
    <Card className="mb-3 shadow-sm border-light">
      <Card.Body className="bg-light">
        <Card.Title className="font-weight-bold text-secondary">
          {product.name}
        </Card.Title>
        <Card.Text className="text-muted">Price: ${product.price}</Card.Text>
        <Card.Text className="text-muted">Stock: {product.quantity}</Card.Text>
        <Button
          variant="outline-secondary"
          className="w-100 btn-glow-simple"
          onClick={addToSelectedProducts}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}
