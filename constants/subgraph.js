import { gql } from "@apollo/client";

export const getDocumentUploadeds = () => {
  return gql`
    {
      documentUploadeds(first: 2, orderBy: blockNumber, orderDirection: desc) {
        documentUniqueId
        transactionHash
      }
    }
  `;
};

export const getOwnershipTransferSuccesses = () => {
  return gql`
    {
      ownershipTransferSuccesses(
        first: 1
        orderBy: blockNumber
        orderDirection: desc
      ) {
        documentUniqueIdHash
        receiver
      }
    }
  `;
};
