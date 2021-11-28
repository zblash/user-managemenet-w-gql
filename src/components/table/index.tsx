import React from 'react';
import { useTable } from 'react-table';
import styled from 'styled-components';

const StyledTable = styled.table`
  text-align: left;
  line-height: 40px;
  border-collapse: separate;
  border-spacing: 0;
  border: 2px solid #36304a;
  width: 100%;
  margin: 50px auto;
  border-radius: 0.25rem;

  thead {
    tr {
      background: #36304a;
      color: #fff;
      border: none;
    }
  }

  tbody {
    tr {
      td {
        border-bottom: 1px solid #ddd;
      }
      &:hover {
        background-color: #f2f2f2;
        cursor: default;
      }
      &:last-child {
        td {
          border: none;
        }
      }
    }
  }

  th:first-child,
  td:first-child {
    padding: 0 15px 0 20px;
  }
  td:last-child {
    text-align: right;
    padding-right: 10px;
  }
`;

interface UITableColumnProps<T> {
  Header: string;
  accessor: string;
  customRenderer?: (item: T) => React.ReactElement | string | number;
}

function useTableRowNormalizator<T>(items: UITableColumnProps<T>[]) {
  return items.map(item => {
    if (item.customRenderer && typeof item.customRenderer === 'function') {
      const Cell = (i: any) => {
        return item.customRenderer(i.row.original);
      };

      return { Cell, ...item };
    }

    return item;
  });
}

interface UITableProps<T> {
  data: T[];
  columns: UITableColumnProps<T>[];
}

function UITableComponent<T>(props: UITableProps<T>) {
  const [columns] = React.useState(useTableRowNormalizator(props.columns));
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: props.data,
  });

  return (
    <div>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, index) => (
                <th className="text-center align-middle" {...column.getHeaderProps()}>
                  <span className="font-weight-normal">{column.render('Header')}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);

            return (
              <tr className="text-center" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
}

const PureUITableComponent = React.memo(UITableComponent);

export { PureUITableComponent as UITableComponent };
