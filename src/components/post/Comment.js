const Comment = () => (
  <div className="bg-white p-4 m-4 rounded-lg">
    <script
      src="https://utteranc.es/client.js"
      repo={process.env.NEXT_PUBLIC_UTTERANCES_REPO}
      issue-term="title"
      theme="github-light"
      crossOrigin="anonymous"
      async
    />
  </div>
);

export default Comment;
