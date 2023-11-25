import Table from 'react-bootstrap/Table';
import React from 'react';
import Loading from './loading';
import { sort_table_data } from '../helper';
/** 
 * Primary table we used to display everything
 * Props: 
        keyCol - The unique key column for this table
        data - A list of json data containing the appropriate data as defined by columns
        columns - A list of column names and the corresponding id in the data
        rowEvents_const - (OPTIONAL) A json object contating functions when a user interacts with a row 
        disableHover - (OPTIONAL) Disables mouse hovering over the table. Is false by default.
}
**/
function YresTable(props) {
  const { keyCol, data, columns, rowEvents_const, disableHover } = props;
  let rowEvents = rowEvents_const;
  const TCols = columns.map((item) => item.dataField);
  var data_display = sort_table_data(keyCol, data);
  if (rowEvents === undefined) {
    rowEvents = { onClick: (_) => {} };
  }
  const [hydrated, setHydrated] = React.useState(false);
	React.useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return <Loading/>;
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
          {data_display.map((row, rowIndex) => 
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