const showInputSection = document.querySelector('#showInputSection');
const inputSection = document.querySelector('#inputSection');
const form = document.querySelector('#form');
const deckOfPosts = document.querySelector('#deckOfPosts');

// Data variables
let posts = [];

let postId = 0;

// Functions
const pushPost = (titleInput, textInput, authorInput, imgInput, arr) => {
  let post = {
    title: titleInput,
    text: textInput,
    author: authorInput,
    img: imgInput
  };

  // generate post id
  if (arr.length === 0) {
    post.id = 0;
  } else {
    post.id = arr.length;
  }

  posts.push(post);
  generatePost(post);
};

// generate post

const generatePost = post => {
  // html structure for new post
  let newPost = `<div id="${post.id}" class="post">
  <div class="post-img">
      <img src="${post.img}" alt="image of author">
  </div>
  <div class="post-body">
  <div class="post-admin">
          <p>
              <i class="update fas fa-edit"></i>
          </p>
          <p>
                  <i class="delete far fa-trash-alt"></i>
          </p>
      </div>
      <div class="post-title">${post.title}</div>
      <div class="post-text">${post.text}</div>
  </div>
</div>`;

  for (post of posts) {
    // prevent loop to inject same post more than once
    if (post.id === postId) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      postId++;
    } else if (postId === post.id) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      postId++;
    }
  }
};

// fetch post object with id

const getPost = postId => {
  // convert post id to number
  let idNumber = parseInt(postId);
  for (post of posts) {
    // find post in posts array
    if (post.id === idNumber) {
      // returns post object
      return post;
    }
  }
};

// Show form with value from fetched object

const updatePost = postObj => {
  // form html + post value
  const updatePostForm = `<input type="text" id="formTitle" value="${
    postObj.title
  }">
  <textarea id="formText" cols="30" rows="10">${postObj.text}</textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" value="${postObj.authour}">
      <input type="text" id="formAuthorImg" value="${postObj.img}">
  </div>
  <input type="submit" value="update post">`;

  // insert post value + update form
  form.insertAdjacentHTML('afterbegin', updatePostForm);

  // show section
  inputSection.style.display = 'block';
};

// delete post through id

const removePost = postToRemove => {
  console.log(postToRemove);
  let removePostId = parseInt(postToRemove.id);
  deckOfPosts.removeChild(postToRemove);
  posts = posts.filter(postID => postID === removePostId);
  console.log(posts);
};

// Event Listners

// generates create post form and shows input section

showInputSection.addEventListener('click', e => {
  // html code to be injected on event
  const createPostForm = `<input type="text" id="formTitle" placeholder="title">
  <textarea id="formText" cols="30" rows="10" placeholder="post text"></textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" placeholder="name of author">
      <input type="text" id="formAuthorImg" placeholder="author image">
  </div>
  <input type="submit" value="make new post">`;

  // disable nav button
  showInputSection.disabled = true;

  // inject create post form on site
  form.insertAdjacentHTML('beforeend', createPostForm);

  // show form section
  inputSection.style.display = 'block';
});

// submit form listener

form.addEventListener('submit', e => {
  e.preventDefault();

  // fetch values from inputs
  let formTitle = document.querySelector('#formTitle').value;
  let formText = document.querySelector('#formText').value;
  let formAuthor = document.querySelector('#formAuthor').value;
  let formAuthorImg = document.querySelector('#formAuthorImg').value;

  // create object to push to arrary
  pushPost(formTitle, formText, formAuthor, formAuthorImg, posts);

  // hides form section
  inputSection.style.display = 'none';

  // empty form section
  form.innerHTML = '';

  // disable sho input button
  showInputSection.disabled = false;
});

// delegated listener on posts.

deckOfPosts.addEventListener('click', e => {
  console.log(e.target);
  e.preventDefault();

  // update post choice

  if (e.target.className === 'update fas fa-edit') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    let fetchedPost = getPost(post.id);
    updatePost(fetchedPost);

    // remove post choice
  } else if (e.target.className === 'delete far fa-trash-alt') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    removePost(post);
  }
});
