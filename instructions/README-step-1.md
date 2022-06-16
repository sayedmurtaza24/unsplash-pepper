# Salt Gallery - Step 1 - Building the MVP

## Scenario

A minimum viable product (MVP) is a version of a product with just enough features to satisfy early customers and provide feedback for future product development.

## Objectives

- Setting up a project from scratch with testing, linting and git initialization.
- Learn how to build a single page application with vanilla JS. 
- Webpack and Babel configuration.
- State-based view. The view should be dependent on the data that you store in a state. The state could for example be an object stored in a constant.
- Setting, getting and updating localStorage.
- Testing your application with jest and jsdom.

## MVP specifications

### Github repository setup

You will not be working towards our repository this time. Instead, you'll set up your own Github repo. The repository must have two branches - `main` and `development`. You should be working towards the development branch. 

### Tech stack specifications

The project _must_:

1. Be linted using the salt-config-eslint package.
2. Be tested up using Jest as a testrunner. Jest ships with jsdom - make sure to test your dom-implementations as well as other functions.
3. Have only _one_ `index.html` (our 'Single Page') which should be created through you webpack configuration (see more below).
4. Have _multiple_ JavaScript files and any imports from one file to another should be made using ES6 import/export syntax (e.g. `import fetcher from './fetcher'`).
5. Be styled using SCSS.
6. Have all of its JavaScript and SCSS bundled with webpack.
7. Have webpack set up with babel so that any newer JavaScript syntax is compiled into a format browsers support.
8. Have one `start` script for running webpack in development mode, and one `build` script for running webpack in production mode.

Webpack is probably fairly new to many of you. [Here's an article](https://www.taniarascia.com/how-to-use-webpack/) that contains/refers to all you need to set up webpack in you project. Make sure you understand what you did to set up webpack - don't just copy/paste. This link might not be sufficient. Make sure to google other tutorials for reference. 

### MVP requirements

We want you to build an application similar to the following 'design'. Remember to write tests along the way to make sure that your functions are working as they should.

<img src="design.jpg" height="400px" object-fit="contain"/>

We require that the application:

1. Has a form which, on submit, fetches images from the [Unsplash API /search/photos endpoint](https://unsplash.com/documentation#search-photos). You'll have to set up a developer account and get an API key for making your requests. Remember to put your API key in a .env file and also adding .env to your gitignore to make sure that you don't push that information to git.

2. When the form is selected, a 'suggestions' list should be appended to it. The suggestions list should be based on any previous searches. We want you to do this by saving the previous searches in [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (which is like a database in the browser). Remember that the view should be based on the state, not the other way around.

3. When you get a response from the Unsplash API, render the 10 images as cards on the web page. Tip: save the result in a state and render a list based on that state.

4. Every card should have a flip/rotate animation. On the backside of each card, list some text information from the Unsplash API response.

Bonus: If you complete all above, add pagination functionality so that when clicking the `next` button, the 10 next images should be displayed. There should also be a `previous` button which fetches the previous 10 images.


---

Good luck and have fun!
