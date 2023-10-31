import Table from 'react-bootstrap/Table';

function YresTable(props) {
  const { data, columns, rowEvents } = props;
  const TCols = columns.map((item) => item.dataField);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((item) => <th>{item.text}</th>)}
        </tr>
      </thead>
      <tbody>
          {data.map((row, rowIndex) => 
            <tr onClick={() => rowEvents.onClick(row, rowIndex)}>
                {TCols.map((colName) => <td>{row[colName]}</td>)}
            </tr>)}
      </tbody>
    </Table>
  );
}

export default YresTable;