import Table from 'react-bootstrap/Table';

function YresTable(props) {
  const { keyCol, data, columns, rowEvents, disableHover } = props;
  const TCols = columns.map((item) => item.dataField);

  return (
    <div className='table-container'>
      <Table striped bordered hover={!disableHover }>
        <thead className='table-header'>
          <tr>
            {columns.map((item, i) => <th key={i}>{item.text}</th>)}
          </tr>
        </thead>
        <tbody>
            {data.map((row, rowIndex) => 
              <tr key={row[keyCol]} onClick={() => rowEvents.onClick(row, rowIndex)}>
              {TCols.map((colName) => {
                  if (Array.isArray(row[colName])) {
                    let string = row[colName].join(', ');
                    return <td key={`${row[keyCol]}:${colName}`}>{string}</td>;
                  } else {
                    return <td key={`${row[keyCol]}:${colName}`}>{row[colName]}</td>;
                  }
                })}
              </tr>
            )};
        </tbody>
      </Table>
    </div>
  );
}

export default YresTable