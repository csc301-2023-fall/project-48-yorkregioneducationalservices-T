import Table from 'react-bootstrap/Table';

function YresTable(props) {
  const { keyCol, data, columns, rowEvents, disableHover } = props;
  const TCols = columns.map((item) => item.dataField);

  return (
    <Table striped bordered hover={!disableHover }>
      <thead>
        <tr>
          {columns.map((item, i) => <th key={i}>{item.text}</th>)}
        </tr>
      </thead>
      <tbody>
          {data.map((row, rowIndex) => 
            <tr key={row[keyCol]} onClick={() => rowEvents.onClick(row, rowIndex)}>
                {TCols.map((colName) => <td key={`${row[keyCol]}:${colName}`}>{row[colName]}</td>)}
            </tr>)}
      </tbody>
    </Table>
  );
}

export default YresTable;