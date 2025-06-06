import { Pagination } from 'antd';
import './PaginationControl.css';

export default function PaginationControl({ current, total, onChange }) {
  return (
    <div className="pagination-container">
      <Pagination
        current={current}
        total={total}
        onChange={onChange}
        showSizeChanger={false}
        pageSize={20}
      />
    </div>
  );
}
