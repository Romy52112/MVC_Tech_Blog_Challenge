document.addEventListener('DOMContentLoaded', () => {
  const commentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();
    const postId = window.location.pathname.split('/').pop(); // Assuming the URL has the post ID at the end

    if (comment_text) {
      try {
        const response = await fetch(`/api/comments`, {
          method: 'POST',
          body: JSON.stringify({ comment_text, post_id: postId }),
          headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
          document.location.reload();
        } else {
          const errorData = await response.json();
          alert(`Failed to add comment: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        alert(`Failed to add comment: ${error.message}`);
      }
    } else {
      alert('Comment cannot be empty.');
    }
  };

  const form = document.querySelector('#comment-form');
  if (form) {
    form.addEventListener('submit', commentFormHandler);
  }
});
