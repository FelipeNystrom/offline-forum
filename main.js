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
  if (arr.length === 0) {
    post.id = 0;
  } else {
    post.id = arr.length;
  }
  posts.push(post);
  generatePost(post);
};

const generatePost = post => {
  for (post of posts) {
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

    if (post.id === postId) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      postId++;
    } else if (postId === post.id) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      postId++;
    }
  }
};

const getPost = postId => {
  let idNumber = parseInt(postId);
  for (post of posts) {
    console.log(post.id);
    if (post.id === idNumber) {
      return post;
    }
  }
};

const updatePost = postObj => {
  const updatePostForm = `<input type="text" id="formTitle" value="${
    postObj.title
  }">
  <textarea id="formText" cols="30" rows="10">${postObj.text}</textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" value="${postObj.authour}">
      <input type="text" id="formAuthorImg" value="${postObj.img}">
  </div>
  <input type="submit" value="update post">`;

  form.insertAdjacentHTML('afterbegin', updatePostForm);
  inputSection.style.display = 'block';
};

const removePost = postToRemove => {
  console.log(postToRemove);
  let removePostId = parseInt(postToRemove.id);
  deckOfPosts.removeChild(postToRemove);
  posts = posts.filter(postID => postID === removePostId);
  console.log(posts);
};
// Event Listners
showInputSection.addEventListener('click', e => {
  const createPostForm = `<input type="text" id="formTitle" placeholder="title">
  <textarea id="formText" cols="30" rows="10" placeholder="post text"></textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" placeholder="name of author">
      <input type="text" id="formAuthorImg" placeholder="author image">
  </div>
  <input type="submit" value="make new post">`;
  showInputSection.disabled = true;
  form.insertAdjacentHTML('beforeend', createPostForm);
  inputSection.style.display = 'block';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let formTitle = document.querySelector('#formTitle').value;
  let formText = document.querySelector('#formText').value;
  let formAuthor = document.querySelector('#formAuthor').value;
  let formAuthorImg = document.querySelector('#formAuthorImg').value;
  pushPost(formTitle, formText, formAuthor, formAuthorImg, posts);
  inputSection.style.display = 'none';
  form.innerHTML = '';
  showInputSection.disabled = false;
});

deckOfPosts.addEventListener('click', e => {
  console.log(e.target);
  e.preventDefault();
  if (e.target.className === 'update fas fa-edit') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    let fetchedPost = getPost(post.id);
    updatePost(fetchedPost);
  } else if (e.target.className === 'delete far fa-trash-alt') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    removePost(post);
  }
});
