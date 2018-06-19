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
  generatePost();
};

const generatePost = () => {
  for (post of posts) {
    let newPost = `<div class="post">
                    <div class="post-img">
                        <img src="${post.img}" alt="image of author">
                    </div>
                    <div class="post-body">
                        <div class="post-title">${post.title}</div>
                        <div class="post-text">${post.text}</div>
                    </div>
                    <div class="post-admin">
                            <p class="update">
                                <i class="fas fa-edit"></i>
                            </p>
                            <p class="delete">
                                    <i class="far fa-trash-alt"></i>
                            </p>
                        </div>

                </div>`;

    deckOfPosts.insertAdjacentHTML('beforeend', newPost);
  }
};

// Event Listners
showSection.addEventListener('click', e => {
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
