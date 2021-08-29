import { Fragment } from "react";

import Head from "next/head";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald&family=Jost:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div
        className="w-screen bg-gray-200 text-center uppercase border-4 p-2 box-border bg-primary text-white"
        style={{ borderColor: "#ada785" }}
      >
        <h1
          className="text-4xl tracking-wide mb-1"
          style={{
            color: "#ada785",
            fontFamily: "'Jost', sans-serif",
            fontWeight: "500",
          }}
        >
          AJIO CARES
        </h1>
        <div
          className="mb-1 text-lg tracking-wide"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
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
