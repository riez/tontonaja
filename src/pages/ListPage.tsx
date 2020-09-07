import useSwr from "swr";
import { useCallback } from "react";
import { getRouter, Router, Link } from "../routes";
import { NextPage } from "next";
import { Container, Grid, Button, Icon, Segment, Loader } from "semantic-ui-react";
import moment from 'moment';
import LazyLoad from "react-lazyload";
import styled from "styled-components";
import { serialize } from "../utils";
import Page from "../component/Page";
import SearchInput from "../component/SearchInput";
import FilmCard from "../component/FilmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StyledContainer = styled(Container)`
  padding: 2rem 0;
`;

const StyledSegment = styled(Segment)`
  box-shadow: none !important;
  border: none !important;
  background: #000 !important;
`;

const ListPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const { data, error } = useSwr(
    `/api/films?${serialize(router?.query)}`,
    fetcher
  );

  const handleSearch = useCallback((params: string) => {
    Router.replaceRoute(`/lists?${params}`);
  }, []);

  const handleSortShowTimeDown = useCallback(() => {
    Router.replaceRoute(`/lists?sortBy=showTime&order=asc`);
  }, []);
  const handleSortShowTimeUp = useCallback(() => {
    Router.replaceRoute(`/lists?sortBy=showTime&order=desc`);
  }, []);

  if (error) {
    return renderErrorPage();
  }
  if (!data) {
    return renderLoadingPage();
  }

  return (
    <Page
      metaTitle={"Films List"}
      metaDescription={
        "List of Video available on our website. Contains various species and location. Eg. Mountains, humans..."
      }
      introHeader={{
        isHome: false,
        title: "Search",
        subTitle: "Find your favourite movie",
      }}
    >
      <StyledContainer>
        <StyledSegment inverted>
          <Grid stretched>
            <SearchInput onSearch={handleSearch} />
          </Grid>
          <Grid columns={2} stackable>
            <Grid.Column stretched>
              <Button
                icon
                labelPosition="left"
                onClick={handleSortShowTimeDown}
              >
                <Icon name="sort amount down" />
                Sort by Show Time
              </Button>
            </Grid.Column>
            <Grid.Column stretched>
              <Button icon labelPosition="left" onClick={handleSortShowTimeUp}>
                <Icon name="sort amount up" />
                Sort by Show Time
              </Button>
            </Grid.Column>
          </Grid>

          <Grid columns={5} doubling stackable>
            {(data || []).map((item, index) => (
              <Grid.Column key={index}>
                <LazyLoad placeholder={<Loader />}>
                  <Link route={`/films/${item.id}`}>
                    <a>
                      <FilmCard
                        title={item?.title}
                        properties={`Show Time: ${moment(item?.showTime).format("DD MMM YYYY")}`}
                        image={item?.image}
                      />
                    </a>
                  </Link>
                </LazyLoad>
              </Grid.Column>
            ))}
          </Grid>
        </StyledSegment>
      </StyledContainer>
    </Page>
  );
};

export default ListPage;
