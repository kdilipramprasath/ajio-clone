import { Fragment } from "react";

import Head from "next/head";

export default function Home() {
  return (
    <Fragment>
      <div className="w-screen text-center uppercase border-4 p-2 box-border bg-primary text-white border-dirt-yellow">
        <h1 className="text-4xl tracking-wide mb-1 text-dirt-yellow font-Jost font-semibold">
          AJIO CARES
        </h1>
        <div className="mb-1 text-lg tracking-wide font-Oswald">
          <p>
            we do not ask for your bank account or card details verbally or
            telephonically.
          </p>
          <p>
            we also do not ask for money to participate in any of our offers or
            run any lucky draws.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
