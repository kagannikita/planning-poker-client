import React from "react";

type LoaderProps = {
  loaderText: string
};

const Loader: React.FC<LoaderProps> = ({loaderText}: LoaderProps) => {
  return (
    <div className="ui segment wrapper">
      <div className="ui active inverted dimmer">
        <div className="ui big text loader">{loaderText}</div>
      </div>
      <p/>
    </div>
  );
};

export default Loader;
