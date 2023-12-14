import { test, expect } from 'vitest';
import {
  createUser,
  updatePost,
  deletePost,
  Login,
  getAllPost,
  getSinglePost,
  deleteUser,
} from './actions';
var crypto = require("crypto");
const testUserName = crypto.randomBytes(20).toString('hex');
const testPassword = 'testPassword';

test('create and delete User', async () => {
  const result = await createUser({
    userName: testUserName,
    password: testPassword,
  });

  expect(result.id).toBeDefined();
  expect(result.username).toBe(testUserName);
  expect(result.password).toBeDefined();

  if (result.id) {
    const userId = Number(result.id); 
    let resp = await deleteUser({ userId });
    expect(resp).toBe(userId);
  }
});

test('Login', async () => {
  const result = await Login({
    userName: 'dd',
    password: 'dd',
  });

  expect(result.success).toBe('user log in');
});

test('getAllPost', async () => {
  const result = await getAllPost();

  expect(result.success).toBe('all posts');
  expect(result.posts).toBeDefined();
});

test('getSinglePost', async () => {
  const postIdToRetrieve = 2;

  const result = await getSinglePost({
    postId: postIdToRetrieve,
  });

  expect(result.success).toBe('single post');
  expect(result.post).toBeDefined();
});


test('updatepost', async () => {
  const postIdToUpdate = 4;
  const userId = 3

  const result = await updatePost({
    postId: postIdToUpdate,
    userId: userId, 
    content: 'updatedPost',
  });

  expect(result.success).toBe('post updated');

});


test('deletepost', async () => {
  // const postIdToDelete = 2;

  // const result = await DeletePost({
  //   postId: postIdToUpdate,
  // });

  // expect(result.success).toBe('post deleted');

});
