import Table from 'react-bootstrap/Table';
import React from 'react';
function YresTable(props) {
  const { keyCol, data, columns, rowEvents, disableHover } = props;
  const TCols = columns.map((item) => item.dataField);

  const [hydrated, setHydrated] = React.useState(false);
	React.useEffect(() => {
		// This forces a rerender, so the date is rendered
		// the second time but not the first
		setHydrated(true);
	}, []);
	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null;
	}
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
                    return <td key={`${row[keyCol]}:${colName}`}>{row[colName].join(', ')}</td>
                  } else {
                    return <td key={`${row[keyCol]}:${colName}`}>{row[colName]}</td>
                  }
                })}
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  );
}

export default YresTable