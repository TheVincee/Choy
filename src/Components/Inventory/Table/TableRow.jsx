import { Button } from "react-bootstrap";

export default function TableRow({ product, UpdateModal, DeleteModal }) {
  return (
    <tr key={product.id} className="align-middle text-dark bg-white border-bottom border-dark">
      <td className="p-3 fw-bold text-black">{product.id}</td>
      <td className="p-3 text-black">{product.name}</td>
      <td className="p-3 text-black">{product.sku}</td>
      <td className="p-3 text-black">${product.price}</td>
      <td className="p-3 text-black">{product.quantity}</td>
      <td className="p-3">
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="outline-dark"
            className="d-flex align-items-center justify-content-center p-2 text-uppercase fw-bold border-0 shadow-sm"
            onClick={UpdateModal}
            style={{ backgroundColor: '#000', color: '#fff' }}
          >
            Update
          </Button>
          <Button
            variant="outline-dark"
            className="d-flex align-items-center justify-content-center p-2 text-uppercase fw-bold border-0 shadow-sm"
            onClick={DeleteModal}
            style={{ backgroundColor: '#333', color: '#fff' }}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
