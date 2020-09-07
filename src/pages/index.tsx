import { FunctionComponent } from "react";
import useSwr from "swr";
import { Grid, Segment, Container, Button } from "semantic-ui-react";
import Page from "../component/Page";
import styled from "styled-components";
import { generateBase64InitialImage } from "../utils";
import { FilmModel } from "../models/film";
import { Link } from "../routes";
import FilmCard from "../component/FilmCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const StyledSegment = styled(Segment)`
  box-shadow: none !important;
  border: none !important;
  background: #000 !important;
`;

const ContentContainer = styled.div`
  .title {
    display: grid;
    .featured {
      font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 16px;
      color: #f9002b !important;
      letter-spacing: 2px;
      line-height: 1.4em;
    }
    .highlight {
      font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
      font-size: 70px;
      line-height: 1.2em;
      strong {
        font-weight: 800;
      }
    }
  }
`;

const PopularCard = styled.div`
  position: relative;
  color: white;
  background: linear-gradient(
      337deg,
      rgba(0, 0, 0, 0.8799894957983193) 0%,
      rgba(0, 0, 0, 0.8183648459383753) 39%,
      rgba(0, 0, 0, 0.19091386554621848) 63%
    ),
    url(/popular.jpeg) !important;
  background-size: cover !important;
  height: 45vh;
  margin: 5vw 0;
  .container {
    display: flex;
    height: 100%;
    align-items: center;
    position: relative;
  }
  .meta {
    position: absolute;
    text-align: right;
    max-width: 25vw;
    flex: 1;
    right: 0;
    .title {
      font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
      font-weight: 600;
      line-height: 3rem;
      font-size: 2.5rem;
    }
    .description {
    }
  }
`;

const MoreContainer = styled.div`
  padding: 2rem 0;
  text-align: center;
`;

const MoreButton = styled(Button)`
  border-radius: 50px !important;
`;

const Homepage: FunctionComponent<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const { data: dataFeatured, error: errorFeatured } = useSwr(
    `/api/films?page=2&limit=10`,
    fetcher
  );
  const { data: dataPopular, error: errorPopular } = useSwr(
    `/api/films?page=5&limit=20`,
    fetcher
  );
  if (errorFeatured || errorPopular) {
    return renderErrorPage();
  }
  if (!dataFeatured || !dataPopular) {
    return renderLoadingPage();
  }
  return (
    <Page
      introHeader={{
        isHome: true,
      }}
    >
      <Container>
        <StyledSegment inverted>
          <ContentContainer>
            <div className="title">
              <div className="featured">Featured</div>
              <div className="highlight">
                <strong>Now</strong> Showing
              </div>
            </div>
            <br />
            <Grid columns={5} doubling stackable>
              {(dataFeatured || []).map((item, index) => (
                <Grid.Column key={index}>
                  <Link route={`/films/${item.id}`}>
                    <a>
                      <FilmCard
                        title={item?.title}
                        properties={`${item?.releaseDate} / ${item?.genres}`}
                        image={item?.image}
                      />
                    </a>
                  </Link>
                </Grid.Column>
              ))}
            </Grid>
          </ContentContainer>
        </StyledSegment>
      </Container>
      <PopularCard>
        <Container>
          <div className="meta">
            <div className="title">Dead Pool</div>
            <div className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              enim ligula, volutpat a lectus quis, tempus dignissim arcu. Nunc
              sed tempor elit. Proin urna lectus, molestie ac pretium eu,
              pharetra ut augue.
            </div>
          </div>
        </Container>
      </PopularCard>
      <Container>
        <StyledSegment inverted>
          <ContentContainer>
            <div className="title">
              <div className="featured">Popular</div>
              <div className="highlight">
                <strong>New</strong> Theater
              </div>
            </div>
            <br />
            <Grid columns={5} doubling stackable>
              {(dataPopular || []).map((item, index) => (
                <Grid.Column key={index}>
                  <Link route={`/films/${item.id}`}>
                    <a>
                      <FilmCard
                        title={item?.title}
                        properties={`${item?.releaseDate} / ${item?.genres}`}
                        image={item?.image}
                      />
                    </a>
                  </Link>
                </Grid.Column>
              ))}
            </Grid>
          </ContentContainer>
        </StyledSegment>
      </Container>
      <MoreContainer>
        <Link route={"/lists"}>
          <a>
            <MoreButton color="red" size="huge">
              Discover More
            </MoreButton>
          </a>
        </Link>
      </MoreContainer>
    </Page>
  );
};

export default Homepage;
