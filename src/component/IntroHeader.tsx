import { FunctionComponent } from "react";
import {
  Grid,
  Container,
} from "semantic-ui-react";
import styled from "styled-components";

interface IntroData {
  isHome: boolean;
  title: string;
  subTitle: string;
}

interface Props {
  data: IntroData;
}

const StyledContainer = styled(Container)`
  background: transparent !important;
  padding-top: 10vw;
  ${props => props.ishomepage === "true" && "padding-bottom: 10vw;"}

  .intro-text {
    text-align: left;
  }
`;

const TitleText = styled(Grid.Row)`
  font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 5rem !important;
  line-height: 6rem;
`;

const SubtitleText = styled(Grid.Row)`
  line-height: 3rem;
  font-size: 1.3rem;
  color: white;
`;

const IntroHeader: FunctionComponent<Props> = ({ data }) => {
  return (
    <StyledContainer ishomepage={data?.isHome?.toString()}>
      <div className="intro-text">
        <TitleText>{data?.title || "WELCOME TO TontonAja THEATER"}</TitleText>
        <SubtitleText>
          {data?.subTitle ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </SubtitleText>
      </div>
    </StyledContainer>
  );
};

export default IntroHeader;
