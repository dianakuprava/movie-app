import { Input } from 'antd';
import { debounce } from 'lodash';

const SearchBar = ({ onSearch }) => {
  const handleSearch = debounce((query) => {
    onSearch(query);
  }, 500);

  return <Input placeholder="Type to search..." onChange={(e) => handleSearch(e.target.value)} />;
};

export default SearchBar;
