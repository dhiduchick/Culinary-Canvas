// function submitForm() {
//     var title = document.getElementById('title').value;
//     var author = document.getElementById('author').value;
//     var ingredients = document.getElementById('ingredients').value;
//     var steps = document.getElementById('steps').value;

//     // Get the selected image file
//     var imageFile = document.getElementById('image').files[0];
    
//     }
const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#recipe-title').value.trim();
    const author = document.querySelector('#recipe-author').value.trim();
    const ingredients = document.querySelector('#recipe-ingredients').value.trim();
    const directions = document.querySelector('#recipe-desc').value.trim();
  
    const imageInput = document.querySelector('#recipe-image');
    const imageFile = imageInput.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('author', author);
    formData.append('ingredients', ingredients);
    formData.append('directions', directions);
    formData.append('image', imageFile);
  
    const response = await fetch(`/api/recipe`, {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        document.location.replace('/recipe');
      } else {
        alert('Failed to create project');
      }
    };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/recipe/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/post');
      } else {
        alert('Failed to delete recipe');
      }
    }
  };
  
  document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.recipe-list')
    .addEventListener('click', delButtonHandler);
  