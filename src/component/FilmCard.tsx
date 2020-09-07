import { FunctionComponent } from "react";
import styled from "styled-components";
import { generateBase64InitialImage } from "../utils";

interface Props {
  title: string;
  properties: string;
  image: string;
}

const CardContainer = styled.div`
  .film-cover {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
  .meta {
    .properties {
      color: #ed5f6f !important;
      text-transform: capitalize;
    }
    .title {
      font-family: "Montserrat", Helvetica, Arial, Lucida, sans-serif;
      font-weight: 600;
      line-height: 2.4rem;
      font-size: 1.2rem;
    }
  }
`;

const FilmCard: FunctionComponent<Props> = ({ title, properties, image }) => {
  return (
    <CardContainer>
      <img
        className="film-cover"
        src={image || generateBase64InitialImage(title)}
      />
      <div className="meta">
        <div className="properties">
          {properties}
        </div>
        <div className="title">{title}</div>
      </div>
    </CardContainer>
  );
};

export default FilmCard;
