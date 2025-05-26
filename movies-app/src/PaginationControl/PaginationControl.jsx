import { Pagination } from 'antd';

const PaginationControl = ({ current, total, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
};

export default PaginationControl;