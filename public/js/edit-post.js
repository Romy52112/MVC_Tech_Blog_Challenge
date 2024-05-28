document.addEventListener('DOMContentLoaded', () => {
    const editPostFormHandler = async (event) => {
      event.preventDefault();
  
      const title = document.querySelector('input[name="title"]').value.trim();
      const content = document.querySelector('textarea[name="content"]').value.trim();
      const postId = window.location.pathname.split('/').pop(); // Assuming the URL has the post ID at the end
  
      if (title && content) {
        try {
          const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' }
          });
  
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            const errorData = await response.json();
            alert(`Failed to update post: ${errorData.message || response.statusText}`);
          }
        } catch (error) {
          alert(`Failed to update post: ${error.message}`);
        }
      } else {
        alert('Title and content cannot be empty.');
      }
    };
  
    const deletePostHandler = async () => {
      const postId = window.location.pathname.split('/').pop(); // Assuming the URL has the post ID at the end
  
      try {
        const response = await fetch(`/api/posts/${postId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const errorData = await response.json();
          alert(`Failed to delete post: ${errorData.message || response.statusText}`);
        }
      } catch (error) {
        alert(`Failed to delete post: ${error.message}`);
      }
    };
  
    const form = document.querySelector('#edit-post-form');
    if (form) {
      form.addEventListener('submit', editPostFormHandler);
    }
  
    const deleteButton = document.querySelector('#delete-post');
    if (deleteButton) {
      deleteButton.addEventListener('click', deletePostHandler);
    }
  
    // Load the post data into the form fields
    const loadPostData = () => {
      const postId = window.location.pathname.split('/').pop(); // Assuming the URL has the post ID at the end
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const post = posts.find(p => p.id == postId);
  
      if (post) {
        document.querySelector('input[name="title"]').value = post.title;
        document.querySelector('textarea[name="content"]').value = post.content;
      }
    };
  
    loadPostData();
  });
  