import assert from 'node:assert/strict';
import { test } from 'node:test';
import { slug } from '../src/slug.mjs';

test('lowercases a heading and separates words with hyphens', () => {
  assert.equal(slug('Hello World'), 'hello-world');
});

test('collapses consecutive whitespace between words', () => {
  assert.equal(slug('Hello \t World'), 'hello-world');
});

test('returns an empty slug for an empty heading', () => {
  assert.equal(slug(''), '');
});
