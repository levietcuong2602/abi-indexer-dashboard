import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/transaction-history/customer-list-results";
import { CustomerListToolbar } from "../components/transaction-history/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useQuery } from "@apollo/client";
import { TOKEN_HISTORIES } from "../apis/queries";

const TransactionHistory = () => {
  const { data, loading, error } = useQuery(TOKEN_HISTORIES, {
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
        <title>Transaction History</title>
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
            <CustomerListResults tokenHistories={data && data.tokenHistories} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
TransactionHistory.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default TransactionHistory;
