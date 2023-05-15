import { MoralisProvider } from "react-moralis";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./pageComponents/header";
import { NotificationProvider } from "web3uikit";
import Footer from "./pageComponents/footer";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_URI,
});
const Layout = ({ children }) => {
  return (
    <NotificationProvider>
      <ApolloProvider client={client}>
        <MoralisProvider initializeOnMount={false}>
          {" "}
          <Header />
          {children}
          <Footer />
        </MoralisProvider>
      </ApolloProvider>
    </NotificationProvider>
  );
};

export default Layout;
