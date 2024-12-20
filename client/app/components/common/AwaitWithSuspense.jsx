import React from "react";
import Await from "./Await"; 
import RenderSuspense from "./RenderSuspense"; 

function AwaitWithSuspense({ queryKeys, queryFunc, options = {}, level = "page", children }) {
  return (
    <Await queryKeys={queryKeys} queryFunc={queryFunc} options={options}>
      {({ isLoading, error, data }) => (
        <RenderSuspense
          isLoading={isLoading}
          error={error}
          data={data}
          level={level}
        >
          {children(data)}
        </RenderSuspense>
      )}
    </Await>
  );
}

export default AwaitWithSuspense;
