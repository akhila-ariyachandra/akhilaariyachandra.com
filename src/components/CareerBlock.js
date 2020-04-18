import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import dayjs from "dayjs";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import { getSortedPositions, getPeriod } from "../util/helpers";

const CareerBlock = ({ company }) => {
  const sortedPositions = getSortedPositions(company);

  return (
    <article className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <OutboundLink
        href={company.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <header className="container">
          <Img
            fluid={company.image.childImageSharp.fluid}
            alt={company.company}
            className="rounded-lg mx-auto"
            style={{ maxWidth: 100 }}
            imgStyle={{ maxWidth: 100 }}
          />

          <h3 className="text-2xl font-semibold text-center">
            {company.company}
          </h3>

          {sortedPositions.length > 1 ? (
            <h5 className="text-lg font-hairline text-center">
              {getPeriod(
                dayjs(sortedPositions[sortedPositions.length - 1].start_date),
                dayjs(sortedPositions[0].end_date)
              )}
            </h5>
          ) : null}
        </header>
      </OutboundLink>

      <section className="self-center grid grid-cols-1 gap-3 text-center sm:text-left col-span-1 sm:col-span-2">
        {sortedPositions.map((position) => (
          <div key={position.title}>
            <h4 className="text-xl font-medium">{position.title}</h4>

            <h5 className="text-lg font-hairline">
              {`${dayjs(position.start_date).format("MMMM YYYY")} - ${
                position.end_date
                  ? dayjs(position.end_date).format("MMMM YYYY")
                  : "Present"
              } (${getPeriod(
                dayjs(position.start_date),
                position.end_date ? dayjs(position.end_date) : dayjs()
              )})`}
            </h5>
          </div>
        ))}
      </section>
    </article>
  );
};

CareerBlock.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CareerBlock;
