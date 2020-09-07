import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import DesktopContainer from "./Container/DesktopContainer";
import MobileContainer from "./Container/MobileContainer";
import { FilmModel } from "../models/film";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  dataFilm?: FilmModel;
  metaTitle?: string;
  metaDescription?: string;
  introHeader?: any;
}

const Container = styled.div`
  background: #000000;
  a {
    color: white;
  }
`;

const Page: FunctionComponent<Props> = ({
  children,
  dataFilm,
  metaTitle,
  metaDescription,
  introHeader,
}) => {
  return (
    <Container>
      <Helmet title={metaTitle || "TontonAja"}>
        <meta
          name="description"
          content={
            metaDescription ||
            "TontonAja is a SEO Optimized Website contains information about Films."
          }
        />
      </Helmet>
      <DesktopContainer introHeader={introHeader} dataFilm={dataFilm}>
        {children}
      </DesktopContainer>
      <MobileContainer dataFilm={dataFilm}>
        {children}
      </MobileContainer>
    </Container>
  );
};

export default Page;
