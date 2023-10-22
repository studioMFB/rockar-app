// src/Hello.tsx
import { useQuery, gql } from '@apollo/client';

const HELLO_QUERY = gql`
  query getHello {
    hello
  }
`;

function Hello() {
  const { loading, error, data } = useQuery(HELLO_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

  return <p>{data.hello}</p>;
}

export default Hello;
