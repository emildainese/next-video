import { useTheme } from '@/context/ThemeContext';
import { InputGroup, FormControl } from 'react-bootstrap';
import classes from './SearchInput.module.scss';

const SearchInput = ({ navHeight }) => {
  const { theme } = useTheme();

  return (
    <InputGroup
      style={{
        borderBottom: `1px solid ${theme.primary}`,
        height: `${navHeight}px`,
      }}
    >
      <FormControl type="text" placeholder="Search" className="p-3 search" />
      <InputGroup.Append className={classes.searchIcon}>
        <InputGroup.Text
          className="bg-transparent center"
          style={{ height: '100%', width: '50px' }}
        >
          <i className="fa fa-search"></i>
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default SearchInput;
