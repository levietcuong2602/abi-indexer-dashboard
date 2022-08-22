import { formatDistanceToNow, subHours } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { GET_TOKEN_COUNTERS } from "../../apis/queries";
import { formatNumber } from "../../utils/format-number";

const products = [
  {
    id: uuid(),
    name: "Dropbox",
    imageUrl: "/static/images/products/product_1.png",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Medium Corporation",
    imageUrl: "/static/images/products/product_2.png",
    updatedAt: subHours(Date.now(), 2),
  },
  {
    id: uuid(),
    name: "Slack",
    imageUrl: "/static/images/products/product_3.png",
    updatedAt: subHours(Date.now(), 3),
  },
  {
    id: uuid(),
    name: "Lyft",
    imageUrl: "/static/images/products/product_4.png",
    updatedAt: subHours(Date.now(), 5),
  },
  {
    id: uuid(),
    name: "GitHub",
    imageUrl: "/static/images/products/product_5.png",
    updatedAt: subHours(Date.now(), 9),
  },
];

export const LatestProducts = (props) => {
  const {
    data = {},
    loading,
    error,
  } = useQuery(GET_TOKEN_COUNTERS, {
    variables: { first: 5, orderBy: "totalBuyTransaction", orderDirection: "desc" },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return null;
  }

  return (
    <Card {...props}>
      <CardHeader subtitle={`${products.length} in total`} title="Latest Tokens" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token ID</TableCell>
                <TableCell>Token Address</TableCell>
                <TableCell>Total Buy Transaction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.tokenCounters.map((token) => (
                <TableRow hover key={token.id}>
                  <TableCell>{token.token.tokenId}</TableCell>
                  <TableCell>{token.token.tokenAddress}</TableCell>
                  <TableCell>{formatNumber(token.totalBuyTransaction)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
          View all
        </Button>
      </Box>
    </Card>
  );
};
