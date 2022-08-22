import Head from "next/head";
import { Box, Container, Grid, Pagination } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { products } from "../__mocks__/products";
import { CustomerListResults } from "../components/orders/order-list-results";
import { CustomerListToolbar } from "../components/orders/order-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { GET_SALE_ORDERS } from "../apis/queries";

const Orders = () => {
  const { data, loading, error } = useQuery(GET_SALE_ORDERS, {
    variables: { first: 10, orderBy: "createdAtTimestamp", orderDirection: "desc" },
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Orders | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <CustomerListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults saleOrders={data && data.saleOrders} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
