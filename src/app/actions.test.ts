import { test, expect } from 'vitest';
import {
  createUser,
  Login,
  getAllPost,
  getSinglePost,
} from './actions';
var crypto = require("crypto");
// Sample test data
const testUserName =  crypto.randomBytes(20).toString('hex');
const testPassword = 'testPassword';

test('createUser', async () => {
  const result = await createUser({
    userName: testUserName,
    password: testPassword,
  });

  expect(result.id).toBeDefined();
  expect(result.username).toBe(testUserName);
  expect(result.password).toBeDefined();
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
