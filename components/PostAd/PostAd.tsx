import Script from "next/script";

const PostAd = () => {
  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9764216594022086"
        data-ad-slot="2810783403"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="post-ad-script">
        (adsbygoogle = window.adsbygoogle || []).push({});
      </Script>
    </>
  );
};

export default PostAd;
