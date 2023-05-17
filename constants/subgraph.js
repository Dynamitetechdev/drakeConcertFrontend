import { gql } from "@apollo/client";

export const getEndTimeEvents = () => {
  return gql`
    {
      endTimeEvents {
        _endTime
      }
    }
  `;
};
