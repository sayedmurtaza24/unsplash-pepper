/**
 * @jest-environment jsdom
 */

test('attach images to the content__images', () => {
   // Set up our document body
   document.body.innerHTML =
      '<div class="content__images"></div>';

   const images = [{ url: 'http://a/', description: 'a' }, { url: 'http://b/', description: 'b' },]

   // This module has a side-effect
   require('../src/dom').attachImages(images);

   const contentImages = document.querySelector(".content__images");

   expect(contentImages.children.length).toBe(2);
   expect(contentImages.children[0].className).toBe('content__image-container');
   expect(contentImages.getElementsByTagName('img').length).toBe(2);
});