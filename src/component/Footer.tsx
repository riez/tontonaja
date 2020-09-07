import { FunctionComponent } from "react";
import {
  Segment,
  Container,
  Grid,
  Icon,
  Header,
  List,
} from "semantic-ui-react";
import styled from "styled-components";

const StyledSegment = styled(Segment)`
  padding: 2rem 0 !important;
  margin-top: 2rem !important;
`;
const Page: FunctionComponent = () => {
  return (
    <>
      <StyledSegment inverted vertical>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={7}>
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Sitemap</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Help & Center" />
                <List link inverted>
                  <List.Item as="a">FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Terms of Service</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header as="h4" inverted>
                  Subscribe
                </Header>
                <p>
                  Newsletter Form
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </StyledSegment>
      <Segment inverted vertical>
        <Container>
          <Grid centered>
            Created with <Icon name="heart" color="red" fitted /> by Farrizal
            Alchudry Mutaqien
          </Grid>
        </Container>
      </Segment>
    </>
  );
};

export default Page;
