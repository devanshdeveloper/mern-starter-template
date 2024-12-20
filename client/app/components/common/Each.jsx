import React, { Fragment } from "react";

const Each = ({
  items = [],
  render,
  keyExtractor = (_, i) => i,
  className,
  wrapper,
  filter,
  sort,
  limit,
  offset,
}) => {
  items = items ?? [];

  let processedItems = [...items];
  if (filter) processedItems = processedItems.filter(filter);
  if (sort) processedItems = processedItems.sort(sort);
  if (typeof offset === "number") processedItems = processedItems.slice(offset);
  if (typeof limit === "number")
    processedItems = processedItems.slice(0, limit);

  const Wrapper = wrapper || "div";

  return (
    <Wrapper className={className}>
      {processedItems.map((item, index) => (
        <Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {render(item, index)}
        </Fragment>
      ))}
    </Wrapper>
  );
};

export default Each;
