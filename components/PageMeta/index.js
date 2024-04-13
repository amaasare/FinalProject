import Head from "next/head";

export function PageMeta({ title = "Elevate" }) {
  const siteName = "Elevate";

  return (
    <Head>
      <title>
        {title.includes(siteName) ? title : `${title} | ${siteName}`}
      </title>
      <meta name="description" content="Opportunities for students" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
