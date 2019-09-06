export const listCommentPost = (allCommentPost) => {
  const containerCommentPost = document.createElement('div');
  const templateCommentPost = `
  <div>
    <p>${allCommentPost.textComment}</p>
  </div>`;
  containerCommentPost.innerHTML = templateCommentPost;
  return containerCommentPost;
};
