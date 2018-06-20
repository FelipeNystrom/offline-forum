const showSection = document.querySelector('#showInputSection');
const inputSection = document.querySelector('#inputSection');
const form = document.querySelector('#form');
const deckOfPosts = document.querySelector('#deckOfPosts');

// Data variables
let posts = [];

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
  let postId = post.id;
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
    if (postId === post.id) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
    }
  }
};

const removePost = post => {
  let postId = parseInt(post.id);
  deckOfPosts.removeChild(post);
  let post = posts.filter(postID => postID.id !== postId);
  console.log(posts);
};

// Event Listners
showSection.addEventListener('click', e => {
  e.preventDefault();
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
});

deckOfPosts.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.className === 'update fas fa-edit') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    console.log(post);
  } else if (e.target.className === 'delete far fa-trash-alt') {
    let post = e.target.parentNode.parentNode.parentNode.parentNode;
    removePost(post);
  }
});
