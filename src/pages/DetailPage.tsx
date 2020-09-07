import useSwr from "swr";
import { getRouter, Link } from "../routes";
import { NextPage } from "next";
import Page from "../component/Page";
import {
  Segment,
  Container,
  Header,
  Grid,
  Table,
  Responsive,
  Image,
} from "semantic-ui-react";
import { FilmModel } from "../models/film";
import styled from "styled-components";
import moment from "moment";
import FilmCard from "../component/FilmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StyledSegment = styled(Segment)`
  ${(props) =>
    props.hideshadow === "true" &&
    `
    box-shadow: none !important;
    border: none !important;
  `}
  background: #000 !important;
`;

const StyledContainer = styled(Container)`
  padding: 1.5rem 0;
  .details-meta {
    display: grid;
  }
`;

const RelatedContainer = styled(Grid.Column)`
  cursor: pointer;
`;

const DetailPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const { data, error }: { data?: FilmModel; error?: any } = useSwr(
    `/api/film/${router?.query?.id}`,
    fetcher
  );
  const { data: dataRelatedFilms, error: errorRelatedFilms } = useSwr(
    "/api/films?page=2&limit=5",
    fetcher
  );
  if (error || errorRelatedFilms) {
    return renderErrorPage();
  }
  if (!data || !dataRelatedFilms) {
    return renderLoadingPage();
  }
  return (
    <Page
      metaTitle={`TontonAja - ${data?.title}`}
      metaDescription={data?.description?.substr(0, 140)}
      dataFilm={data}
      introHeader={{
        isHome: false,
        title: data?.title,
        subTitle: data?.description?.substr(0, 35),
      }}
    >
      <StyledContainer>
        <StyledSegment inverted>
          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            <Image src={data?.image} />
          </Responsive>
          <Header as="h2" textAlign="left">
            <Header.Content>Details</Header.Content>
          </Header>
          <Container>
            <Grid>
              <Grid.Column width={3}>
                <div className="details-meta">
                  <strong>Show Time</strong>
                  <span>{`${moment(data?.showTime).format(
                    "DD MMM YYYY HH:mm"
                  )}`}</span>
                </div>
              </Grid.Column>
              <Grid.Column width={13}>
                {" "}
                <div className="details-meta">
                  <strong>Description</strong>
                  <span>{data?.description}</span>
                </div>
              </Grid.Column>
            </Grid>
          </Container>
          <Table definition inverted>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Producer</Table.Cell>
                <Table.Cell>{data?.producer}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Director</Table.Cell>
                <Table.Cell>{data?.director}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Release Data</Table.Cell>
                <Table.Cell>{data?.releaseDate}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Header as="h2" textAlign="left">
            <Header.Content>
              Related Films
              <Header.Subheader>You might like these list too</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid columns={5} doubling stackable>
            {dataRelatedFilms.map((item: FilmModel) => (
              <Link key={item?.id} route={`/films/${item.id}`}>
                <RelatedContainer>
                  <FilmCard
                    title={item?.title}
                    properties={`${item?.releaseDate} / ${item?.genres}`}
                    image={item?.image}
                  />
                </RelatedContainer>
              </Link>
            ))}
          </Grid>
        </StyledSegment>
      </StyledContainer>
    </Page>
  );
};

export default DetailPage;
