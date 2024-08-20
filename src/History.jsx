import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import { FaEye, FaPrint } from "react-icons/fa";
import { Table, Button, Modal } from 'react-bootstrap';

const API_URL = "http://localhost:5179/api/Order";

export default function Historys() {
  const [historys, setHistory] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getHistory = async () => {
    try {
      const result = await fetchData(`${API_URL}/AllHistory`, "GET");
      setHistory(result);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const viewOrder = async (orderId) => {
    try {
      const result = await fetchData(`${API_URL}/ViewOrder/${orderId}`, "GET");
      setSelectedOrderDetails(result);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrderDetails([]);
  };

  const printAllOrders = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    const printContent = historys.map((history) => `
      <tr>
        <td>${history.OrderId}</td>
        <td>${history.OrderDate}</td>
        <td>$${history.TotalAmount}</td>
      </tr>
    `).join("");

    printWindow.document.open();
    printWindow.document.write(`
      <html>
      <head>
        <title>Print All Orders</title>
        <style>
          body { font-family: 'Arial', sans-serif; margin: 20px; color: #000; background-color: #fff; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #333; color: #fff; }
          td { background-color: #f9f9f9; }
          h1 { color: #333; text-align: center; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>All Orders</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${printContent}
          </tbody>
        </table>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <>
      <Header />

      <div className="d-flex justify-content-center align-items-center mt-4">
        <div className="w-75">
          <Button variant="outline-dark" className="mb-3" onClick={printAllOrders}>
            <FaPrint /> Print All Orders
          </Button>
          <Table responsive bordered className="mt-3 border border-2 border-dark shadow-sm rounded">
            <thead className="bg-dark text-light">
              <tr>
                <th>ID</th>
                <th>Order Date</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {historys.map((history) => (
                <tr key={history.OrderId} className="align-middle">
                  <td>{history.OrderId}</td>
                  <td>{history.OrderDate}</td>
                  <td>${history.TotalAmount}</td>
                  <td>
                    <Button
                      variant="link"
                      className="text-decoration-none p-0"
                      onClick={() => viewOrder(history.OrderId)}
                    >
                      <FaEye className="text-primary" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={isModalOpen} onHide={closeModal} centered>
        <Modal.Header closeButton className="bg-dark text-light border-bottom border-dark">
          <Modal.Title className="text-uppercase">Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light text-dark">
          <Table responsive striped bordered className="text-center">
            <thead className="bg-dark text-light">
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrderDetails.map((item, index) => (
                <tr key={index}>
                  <td>{item.ProductName}</td>
                  <td>{item.Quantity}</td>
                  <td>${item.Price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-top border-dark">
          <Button variant="outline-light" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
