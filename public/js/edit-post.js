document.addEventListener('DOMContentLoaded', () => {
  const editPostFormHandler = async (event) => {
    event.preventDefault();

    const postId = window.location.pathname.split('/').pop();
    const title = document.querySelector('input[name="title"]').value.trim();
    const content = document.querySelector('textarea[name="content"]').value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post.');
      }
    }
  };

  const deletePostHandler = async () => {
    const postId = window.location.pathname.split('/').pop();

    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post.');
    }
  };

  document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);
  document.querySelector('#delete-post').addEventListener('click', (event) => {
    event.preventDefault();
    deletePostHandler();
  });
});
