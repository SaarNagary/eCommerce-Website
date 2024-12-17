import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'

const columns = [
  {
    id: "orderCreatedDate",
    label: "Order Date",
  },
  {
    id: "documentID",
    label: "Order ID",
  },
  {
    id: "orderTotal",
    label: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch(columnName) {
    case 'orderTotal':
      return `$${columnValue}`;
    case 'orderCreatedDate':
      return dayjs(columnValue.nano).format('DD/MM/YYYY');
    default:
      return columnValue
  }
}

const OrderHistory = ({ orders }) => {
  const navigate = useNavigate();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, pos) => {
              const { label } = column;
              return (
                <TableCell key={pos} style={styles}>
                  {label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              const {documentID} = row
              return (
                <TableRow key={pos} onClick={() => navigate(`/order/${documentID}`)}>
                  {columns.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName]
                    const formattedText = formatText(columnName, columnValue)
                    return (
                      <TableCell key={pos} style={styles}>
                        {formattedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderHistory;
