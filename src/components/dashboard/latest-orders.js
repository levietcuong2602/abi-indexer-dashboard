import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useQuery } from "@apollo/client";
import { SeverityPill } from "../severity-pill";
import { formatNumber } from "../../utils/format-number";
import { GET_SALE_ORDERS } from "../../apis/queries";

export const LatestOrders = (props) => {
  const {
    data = {},
    loading,
    error,
  } = useQuery(GET_SALE_ORDERS, {
    variables: { first: 10, orderBy: "createdAtTimestamp", orderDirection: "desc" },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return null;
  }

  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Seller</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.saleOrders.map((order) => (
                <TableRow hover key={order.id}>
                  <TableCell>{order.token.id}</TableCell>
                  <TableCell>{formatNumber(order.price)}</TableCell>
                  <TableCell>{formatNumber(order.amount)}</TableCell>
                  <TableCell>{format(order.createdAtTimestamp * 1000, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{order.seller.id}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
