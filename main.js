const showInputSection = document.querySelector('#showInputSection');
const inputSection = document.querySelector('#inputSection');
const form = document.querySelector('#form');
const deckOfPosts = document.querySelector('#deckOfPosts');

// Data variables
let posts = [];

let _postId = 0;

// FUNCTIONS

// ======== CREATE POST FUNCTIONS ========

// makes a object from new post input form and pushes that object to array posts
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

const generatePost = (post = null) => {
  // html structure for new post
  for (post of posts) {
    let newPost = `<div id="${post.id}" class="post">
                    
                    <div class="post-body">
                    
                        <div class="post-title"><h3>${post.title}</h3></div>
                        <div class="post-text"><p>${post.text}</p> 
                        <em><p> - ${post.author}</p></em>
                        </div>
                        <div class="post-footer">
                          <div class="comments">
                          <div><button class="btn-new-comment">New comment</button></div>
                            <div><button class="btn-show-comments">Show comment</button></div>
                          </div>
                          
                          <div class="post-admin">
                            <p>
                              <a href="#inputSection"><i class="update fas fa-edit"></i></a>
                            </p>
                            <p>
                              <i class="delete far fa-trash-alt"></i>
                            </p>
                          </div>
                        </div>
                        
                    </div>
                  </div>`;
    // prevent loop to inject same post more than once
    if (post.id === _postId) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      _postId++;
    } else if (_postId === post.id) {
      deckOfPosts.insertAdjacentHTML('beforeend', newPost);
      _postId++;
    }
  }
};

// ======== UPDATE POST FUNCTIONS ========

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
  const updatePostForm = `
  <input type="hidden" id="postId" value="${postObj.id}">
  <input type="text" id="formTitle" value="${postObj.title}">
  <textarea id="formText" cols="30" rows="10">${postObj.text}</textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" value="${postObj.authour}">
      <input type="text" id="formAuthorImg" value="${postObj.img}">
  </div>
  <input class="btn-submit update-post" type="submit" value="update post">`;

  // insert post value + update form
  form.insertAdjacentHTML('afterbegin', updatePostForm);

  // show section
  inputSection.style.display = 'block';
};

// ======== REMOVE POST FUNCTION ========

// delete post through id

const removePost = postToRemove => {
  console.log(postToRemove);
  let removePostId = parseInt(postToRemove.id);
  deckOfPosts.removeChild(postToRemove);
  posts = posts.filter(postID => postID === removePostId);
  console.log(posts);
};

// ======== EVENT LISTENERS ========

// generates create post form and shows input section

showInputSection.addEventListener('click', e => {
  // html code to be injected on event
  const createPostForm = `
  <input type="text" id="formTitle" placeholder="title">
  <textarea id="formText" cols="30" rows="10" placeholder="post text"></textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" placeholder="name of author">
      <input type="text" id="formAuthorImg" placeholder="author image">
  </div>
  <input class="btn-submit new-post" type="submit" value="make new post">`;

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
  // check which form is presented
  if (e.target[4].className === 'btn-submit new-post') {
    // create object to push to arrary
    console.log(e.target[4].className);
    pushPost(formTitle, formText, formAuthor, formAuthorImg, posts);
  } else if (e.target[5].className === 'btn-submit update-post') {
    // take post id and fetch object from array
    let postId = document.querySelector('#postId').value;
    let oldPost = getPost(postId);

    // assign new values to postobject
    oldPost.title = formTitle;
    oldPost.text = formText;
    oldPost.author = formAuthor;
    oldPost.img = formAuthorImg;

    // reset post counter
    _postId = 0;

    // remove posts from DOM
    deckOfPosts.innerHTML = '';

    // re-generate posts in array to DOM
    generatePost();

    // re-enable new post button
    showInputSection.disabled = false;
  }

  // hides form section
  inputSection.style.display = 'none';

  // empty form section
  form.innerHTML = '';

  // disable show input button
  showInputSection.disabled = false;
});

// delegated listener on posts.

deckOfPosts.addEventListener('click', e => {
  let post;
  let fetchedPost;
  switch (e.target.className) {
    // update post choice
    case 'update fas fa-edit':
      // disable new post button
      showInputSection.disabled = true;

      // selects whole post element
      post =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode;
      // get post object from array
      fetchedPost = getPost(post.id);
      // generate update form and populate with post values from array
      updatePost(fetchedPost);

      break;

    // remove post choice
    case 'delete far fa-trash-alt':
      post = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;

      removePost(post);

      if (posts.length === 0) {
        _postId = 0;
      }

      break;

    // create new comment to clicked post
    case 'btn-new-comment':
      // clicked post element
      post =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode;
      // get post object from array
      fetchedPost = getPost(post.id);
      console.log('hej');

      break;

    // show comments belonging to clicked post
    case 'btn-show-comments':
      // clicked post element
      post =
        e.target.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode;
      // get post object from array
      fetchedPost = getPost(post.id);
      console.log('hej då');

      break;
  }
});
