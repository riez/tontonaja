import { FunctionComponent, useState, useCallback } from "react";
import {
  Responsive,
  Visibility,
  Segment,
  Menu,
  Button,
  Container,
  Image,
} from "semantic-ui-react";
import { getWidth } from "../../utils";
import styled from "styled-components";
import IntroHeader from "../IntroHeader";
import Footer from "../Footer";
import { Link } from "../../routes";
import { FilmModel } from "../../models/film";

interface Props {
  children: React.ReactNode;
  dataFilm: FilmModel;
  introHeader: any;
}

const StyledSegment = styled(Segment)`
  min-height: 400px;
  padding: 1em 0em;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
    url( ${props => props.background ? props.background : "/cinema.jpg"}) !important;
`;

const DesktopContainer: FunctionComponent<Props> = ({
  children,
  introHeader,
  dataFilm,
}) => {
  const [fixed, changeFixed] = useState(false);
  return (
    <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
      <Visibility
        once={false}
        onBottomPassed={() => changeFixed(true)}
        onBottomPassedReverse={() => changeFixed(false)}
      >
        <StyledSegment
          inverted
          textAlign="center"
          vertical
          background={dataFilm?.image}
        >
          <Menu
            fixed={fixed ? "top" : null}
            inverted={true}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Link route="/">
                <Menu.Item className="item" as="a">
                  TontonAja
                </Menu.Item>
              </Link>
              <Link route="/lists">
                <Menu.Item className="item" position="right">
                  All Films
                </Menu.Item>
              </Link>
            </Container>
          </Menu>
          <IntroHeader data={introHeader} />
        </StyledSegment>
      </Visibility>
      {children}
      <Footer />
    </Responsive>
  );
};

export default DesktopContainer;
