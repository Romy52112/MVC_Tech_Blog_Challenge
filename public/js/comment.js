// const commentFormHandler = async (event) => {
//   event.preventDefault();

//   const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();

//   if (comment_text) {
//     const response = await fetch('/api/comments', {
//       method: 'POST',
//       body: JSON.stringify({ comment_text }),
//       headers: { 'Content-Type': 'application/json' }
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert('Failed to add comment.');
//     }
//   }
// };

// document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();

  if (comment_text) {
    // Disable the submit button to prevent multiple submissions
    const submitButton = document.querySelector('#comment-form button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text }),
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
    } finally {
      // Re-enable the submit button
      submitButton.disabled = false;
      submitButton.textContent = 'Submit';
    }
  } else {
    alert('Comment cannot be empty.');
  }
};

document.querySelector('#comment-form').addEventListener('submit', commentFormHandler);

 //updating post
//  const postFormHandler = async (event) => {
//      event.preventDefault();
  
//      const title = document.querySelector('input[name="post-title"]').value.trim();
//      const content = document.querySelector('textarea[name="post-content"]').value.trim();
  
//      if (title && content) {
//        const response = await fetch('/api/posts', {
//          method: 'POST',
//          body: JSON.stringify({ title, content }),
//          headers: { 'Content-Type': 'application/json' }
//        });
//  }
//     if (response.ok) {
//          document.location.replace('/dashboard');
//        } else {
//            alert('Failed to create post.');
//        }
//  };
//  document.querySelector('#edit-post-form').addEventListener('submit', postFormHandler);
// //   // Delete comment
//   const deleteButton = document.querySelectorAll('.delete-comment');
  
//   deleteButton.forEach((button) => {
//       button.addEventListener('click', async (event) => {
//           const commentId = event.target.getAttribute('data-id');
  
//           const response = await fetch(`/api/comments/${commentId}`, {
//               method: 'DELETE'
//           });
  
//           if (response.ok) {
//               document.location.reload();
//           } else {
//               alert('Failed to delete comment.');
//           }
//       });   
//   })