import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=UN27oUnc8Ma0gwH3grXRaat6I163mp0W1Osa5VUy"
            onLoad={() => {
              console.log("load success");
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
