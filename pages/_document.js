import Document, { Html, Head, Main, NextScript } from "next/document";

class AjioCloneDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" className="fixed z-50 top-0 left-0"></div>
          <div className="relative z-10">
            <Main />
          </div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AjioCloneDocument;
