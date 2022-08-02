import { useTheme } from '@/context/ThemeContext';
import { Table } from 'react-bootstrap';
const uuid = (n) => Math.random().toFixed(n).toString();

const BaseTable = ({ headers, children, ...props }) => {
  const { theme } = useTheme();

  return (
    <Table striped bordered hover variant={theme.type} {...props}>
      <thead>
        <tr>
          <th>#</th>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Table>
  );
};

export default BaseTable;
