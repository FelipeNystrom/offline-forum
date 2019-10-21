const showInputSection = document.querySelector('#showInputSection');
const inputSection = document.querySelector('#inputSection');
const form = document.querySelector('#form');
const deckOfPosts = document.querySelector('#deckOfPosts');

// INITIAL DATA

// Data variables
let posts = [
  {
    title: 'hej hej',
    text: 'Det här är första posten',
    author: '',
    comments: [],
    id: generateRandomId()
  },
  {
    title: 'hej hej',
    text: 'Det här är andra posten',
    author: '',
    comments: [],
    id: generateRandomId()
  },
  {
    title: 'hej hej',
    text: 'Det här är tredje posten',
    author: '',
    comments: [],
    id: generateRandomId()
  },
  {
    title: 'hej hej',
    text: 'Det här är fjärde posten',
    author: '',
    comments: [],
    id: generateRandomId()
  },
  {
    title: 'hej hej',
    text: 'Det här är femte posten',
    author: '',
    comments: [],
    id: generateRandomId()
  }
];

// FUNCTIONS

function generatePostBody(post) {
  return `
    <div id="${post.id}" class="post">
    <div class="post-body">
        <div class="post-title"><h3>${post.title}</h3></div>
        <div class="post-text"><p>${post.text}</p> 
        <em><p> - ${post.author}</p></em>
        </div>
        <div class="post-footer">
          <div class="comments-control">
          <div ><button id="${post.id}" class="btn-new-comment">New comment</button></div>
            <div id="comments-${post.id}"><button id="${post.id}" class="btn-show-comments">Show comment</button></div>
          </div>
          <div class="post-admin">
            <p>
              <a href="#inputSection"><i id="${post.id}" class="update fas fa-edit"></i></a>
            </p>
            <p>
              <i id="${post.id}" class="delete far fa-trash-alt"></i>
            </p>
          </div>
        </div>
        <div id="commentSection-${post.id}" class="commentsSection">
        <h3 id="commentSectionTitle-${post.id}">Comments</h3>
        <ul class="comments-list" id="commentsOnPost-${post.id}"></ul>
        <form id="commentForm-${post.id}" class="comment-input"></form>
        </div>
      </div>
    </div>
  `;
}

function generateRandomId() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

// ======== CREATE POST FUNCTIONS ========

// makes a object from new post input form and pushes that object to array posts

function createNewPost(titleInput, textInput, authorInput, arr) {
  let post = {
    id: generateRandomId(),
    title: titleInput,
    text: textInput,
    author: authorInput,
    comments: []
  };

  posts = [...posts, post];

  generatePosts();
}

function generatePosts(post = null) {
  deckOfPosts.innerHTML = null;
  // html structure for new post
  for (post of posts) {
    let POST = generatePostBody(post);

    deckOfPosts.insertAdjacentHTML('beforeend', POST);
  }
}

function getPost(postId) {
  return posts.filter(post => post.id === postId)[0];
}

// ======== UPDATE POST FUNCTIONS ========
function updatePost(postObj) {
  // form html + post value
  const updatePostForm = `
  <input type="hidden" id="postId" value="${postObj.id}">
  <input type="text" id="formTitle" value="${postObj.title}">
  <textarea id="formText" cols="30" rows="10">${postObj.text}</textarea>
  <div id="formAuthorInfo">
      <input type="text" id="formAuthor" value="${postObj.author}">
      <input type="text" id="formAuthorImg" value="${postObj.img}">
  </div>
  <input class="btn-submit update-post" type="submit" value="update post">`;

  // insert post value + update form
  form.insertAdjacentHTML('afterbegin', updatePostForm);

  // show section
  inputSection.style.display = 'block';
}

// ======== REMOVE POST FUNCTION ========

// delete post through id

function removePost(postId) {
  posts = posts.filter(post => post.id !== postId);

  generatePosts();
}

// ======== COMMENTS ========

function generateCommentForm(whereToAttachForm, postId) {
  // html form to be inserted when new post is clicked
  const newCommentForm = `
  <div id="commentbody-${postId}">
    <input type="hidden" id="postId" value="${postId}">
    <div class="comment-form-input-row">
        <input type="text" class="comment-title" id="commentTitle-${postId}" placeholder="comment title">
        <input class="comment-author" type="text" id="commentAuthor-${postId}" placeholder="author name">
    </div>
    <textarea class="comment-text" id="commentText-${postId}" cols="2" rows="10" placeholder="write your comment"></textarea>
    <input id="leaveComment-${postId}" class="btn-comment-submit" type="submit" value="Leave comment">
  </div>`;

  // form insertion
  whereToAttachForm.insertAdjacentHTML('afterbegin', newCommentForm);
}

// push comment to posts[].comments
function pushComment(commentTitle, commentAuthor, commentText, postId) {
  // gets post with id
  let post = getPost(postId);

  // create comment object
  const newComment = {
    id: generateRandomId(),
    title: commentTitle,
    text: commentText,
    author: commentAuthor
  };

  // pushes comment object to comments array
  post.comments = [...post.comments, newComment];
}

// Generate comments from posts[].comments
function populateComments(postId, placeToPopulate) {
  let comments = getPost(postId).comments;
  placeToPopulate.innerHTML = null;

  // Generate comment element structure
  for (comment of comments) {
    let COMMENT = `
    <li>
      <div class="comment-body">
        <div class="comment-body-title"><h4>${comment.title}</h4></div>
        <div class="comment-body-text">${comment.text}</div>
        <div class="comment-body-author"> - ${comment.author}</div>
      </div>
    </li>`;
    // insert comment to DOM
    placeToPopulate.insertAdjacentHTML('beforeend', COMMENT);
  }
}

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

  showInputSection.disabled = true;
  showInputSection.classList.remove('btn-show');
  showInputSection.classList.add('btn-disabled');

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
    createNewPost(formTitle, formText, formAuthor);
  } else if (e.target[5].className === 'btn-submit update-post') {
    // take post id and fetch object from array
    let postId = document.querySelector('#postId').value;
    let oldPost = getPost(postId);

    // assign new values to postobject
    oldPost.title = formTitle;
    oldPost.text = formText;
    oldPost.author = formAuthor;
    oldPost.img = formAuthorImg;

    // remove posts from DOM
    deckOfPosts.innerHTML = '';

    // re-generate posts in array to DOM
    generatePosts();

    // enable create post button
    showInputSection.disabled = false;
    showInputSection.classList.remove('btn-disabled');
    showInputSection.classList.add('btn-show');
  }

  // hides form section
  inputSection.style.display = 'none';

  // empty form section
  form.innerHTML = '';

  // enable create post button
  showInputSection.disabled = false;
  showInputSection.classList.remove('btn-disabled');
  showInputSection.classList.add('btn-show');
});

// delegated listener on posts.

deckOfPosts.addEventListener('click', e => {
  const {
    target: { id }
  } = e;
  // selects the write comment form
  let commentForm = document.querySelector(`#commentForm-${id}`);

  // Postelement
  let post;

  // Postobject from array
  let fetchedPost;

  // Selects ul for show hide butttons
  let commentUl;

  // Selects section for display & hide
  let commentsSection;

  let commentButton;

  // Switch statement to catch diffrent click scenarios

  switch (e.target.className) {
    // update post button
    case 'update fas fa-edit':
      // disable new post button and change it's style to class disabled
      showInputSection.disabled = true;
      showInputSection.classList.remove('btn-show');
      showInputSection.classList.add('btn-disabled');

      // selects whole post element
      postid = e.target.id;

      // get post object from array
      fetchedPost = getPost(id);

      // generate update form and populate with post values from array
      updatePost(fetchedPost);

      break;

    // remove post button
    case 'delete far fa-trash-alt':
      post = e.target.id;

      removePost(id);

      break;

    // create new comment on post
    case 'btn-new-comment':
      createPostButton = e.target;
      // disable new comment button during wrinting session
      createPostButton.disabled = true;
      createPostButton.classList.remove('btn-new-comment');
      createPostButton.classList.add('btn-comment-disabled');

      // clicked post top element
      post = e.target.id;

      // selects commentsSection to show new comment form
      commentsSection = document.querySelector(`#commentSection-${id}`);

      // get post object from posts array
      fetchedPost = getPost(id);

      // generate and shows new post form
      generateCommentForm(commentForm, id);

      // Choose and set comment section title dynamically
      let commentSectionTitle = document.querySelector(
        `#commentSectionTitle-${id}`
      );
      commentSectionTitle.innerHTML = 'Comments';

      // show whole section
      commentsSection.style.display = 'block';

      commentButton = document.querySelector(`#comments-${id}`).firstChild;
      commentButton.classList.remove('btn-show-comments');
      commentButton.classList.add('btn-hide-comments');
      commentButton.innerText = 'Hide comments';

      // when new comment is submited it is pushed to posts[].comments array and lastly removes the form
      commentForm.addEventListener('submit', e => {
        e.preventDefault();

        let commentTitle = document.querySelector(`#commentTitle-${id}`).value;
        let commentAuthor = document.querySelector(`#commentAuthor-${id}`)
          .value;
        let commentText = document.querySelector(`#commentText-${id}`).value;

        commentForm.innerHTML = '';
        pushComment(commentTitle, commentAuthor, commentText, id);

        let ul = document.querySelector(`#commentsOnPost-${id}`);

        ul.style.display = 'block';
        ul.innerHTML = '';
        populateComments(id, ul);

        commentButton = document.querySelector(`#comments-${id}`).firstChild;

        // change button text and class to hide
        commentButton.classList.remove('btn-show-comments');
        commentButton.classList.add('btn-hide-comments');
        commentButton.innerText = 'Hide comments';

        // re-enable create post button
        createPostButton.disabled = false;
        createPostButton.classList.remove('btn-comment-disabled');
        createPostButton.classList.add('btn-new-comment');
      });

      break;

    // show comments belonging to post
    case 'btn-show-comments':
      commentButton = document.querySelector(`#comments-${id}`).firstChild;
      // selects ul for populate direction
      commentsUl = document.querySelector(`#commentsOnPost-${id}`);

      // selects and shows comments section
      commentsSection = document.querySelector(`#commentSection-${id}`);

      commentsSection.style.display = 'block';

      populateComments(id, commentsUl);
      // get post object from array
      fetchedPost = getPost(id);

      // change button text and class to hide
      commentButton.classList.remove('btn-show-comments');
      commentButton.classList.add('btn-hide-comments');
      commentButton.innerText = 'Hide comments';

      break;

    case 'btn-hide-comments':
      commentButton = document.querySelector(`#comments-${id}`).firstChild;

      // selects commentsSection to show new comment form
      commentsSection = document.querySelector(`#commentSection-${id}`);

      commentsSection.style.display = 'none';

      // change button text and class to show
      commentButton.classList.remove('btn-hide-comments');
      commentButton.classList.add('btn-show-comments');
      commentButton.innerText = 'Show comments';
  }
});

generatePosts();
