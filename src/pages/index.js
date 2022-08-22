import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";

import { TotalTransactions } from "../components/dashboard/total-transaction";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TotalBuyAmount } from "../components/dashboard/total-buy-amount";
import { TotalSellAmount } from "../components/dashboard/total-sell-amount";
import { TotalCancelAmount } from "../components/dashboard/total-cancel-amount";
import { TrafficAmount } from "../components/dashboard/traffic-amount";
import { DashboardLayout } from "../components/dashboard-layout";
import { GET_TRANSACTION_COUNTERS } from "../apis/queries";

const Dashboard = () => {
  const { data = {}, loading, error } = useQuery(GET_TRANSACTION_COUNTERS);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalTransactions
                totalTransaction={
                  data && data.transactionCounters.length > 0
                    ? data.transactionCounters[0].totalTransaction
                    : 0
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalSellAmount
                totalSellTransaction={
                  data && data.transactionCounters.length > 0
                    ? data.transactionCounters[0].totalSellAmount
                    : 0
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalBuyAmount
                totalBuyTransaction={
                  data && data.transactionCounters.length > 0
                    ? data.transactionCounters[0].totalBuyAmount
                    : 0
                }
              />
            </Grid>
            <Grid item xl={3} lg={3} sm={6} xs={12}>
              <TotalCancelAmount
                sx={{ height: "100%" }}
                totalCancelTransaction={
                  data && data.transactionCounters.length > 0
                    ? data.transactionCounters[0].totalCancelAmount
                    : 0
                }
              />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <Sales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <TrafficAmount
                sx={{ height: "100%" }}
                data={{
                  totalSellAmount:
                    data && data.transactionCounters.length > 0
                      ? data.transactionCounters[0].totalSellAmount
                      : 0,
                  totalBuyAmount:
                    data && data.transactionCounters.length > 0
                      ? data.transactionCounters[0].totalBuyAmount
                      : 0,
                  totalCancelAmount:
                    data && data.transactionCounters.length > 0
                      ? data.transactionCounters[0].totalCancelAmount
                      : 0,
                }}
              />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <LatestProducts sx={{ height: "100%" }} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
