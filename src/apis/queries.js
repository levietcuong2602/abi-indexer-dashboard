import { gql } from "@apollo/client";

export const GET_TRANSACTION_COUNTERS = gql`
  query {
    transactionCounters {
      id
      totalTransaction
      totalSellTransaction
      totalBuyTransaction
      totalCancelTransaction
      totalSellAmount
      totalBuyAmount
      totalCancelAmount
    }
  }
`;

export const GET_TRANSACTION_COUNTERS_DATE = gql`
  query ($orderBy: String, $orderDirection: String, $startTime: Int, $endTime: Int) {
    transactionCounterDays(
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { date_gt: $startTime, date_lt: $endTime }
    ) {
      id
      date
      totalTransaction
      totalSellTransaction
      totalBuyTransaction
      totalCancelTransaction
      totalSellAmount
      totalBuyAmount
      totalCancelAmount
    }
  }
`;

export const GET_SALE_ORDERS = gql`
  query ($first: Int, $orderBy: BigInt, $orderDirection: String) {
    saleOrders(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      token {
        id
        tokenAddress
        tokenId
      }
      price
      amount
      seller {
        id
      }
      createdAtTimestamp
    }
  }
`;

export const GET_TOKEN_COUNTERS = gql`
  query ($first: Int, $orderBy: BigInt, $orderDirection: String) {
    tokenCounters(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      token {
        id
        tokenId
        tokenAddress
      }
      totalTransaction
      totalBuyTransaction
    }
  }
`;

export const TOKEN_HISTORIES = gql`
  query ($first: Int, $orderBy: BigInt, $orderDirection: String) {
    tokenHistories(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      actionType
      token {
        id
      }
      amount
      from
      to
      createdAtTimestamp
    }
  }
`;
