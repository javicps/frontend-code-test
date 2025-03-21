This is my solution to the frontend-code-test:

Technical decisions:

- I used several methods in the MainStore to handle box changes + several views to be used inside the components
- I decided to remove the initial box in the tutorial, and start with a blank canvas instead.
- I kept the random color for a new box, but I guess it would be easy to instead create the box with the current selection of the color picker.
- I removed the transform in BoxDraggable, since movement was a little bit caotic with it.
- I included all drag + click logic to the BoxDraggable component. I was wondering if some of the click logic should be added to the parent component Box, considering that we might want to reuse that component and have clicking behaviors, but for the sake of the exercise, I decided to pack it together, since dragging and clicking have some interaction.
- I added a debounce of 200ms on color change input selection, so undo works more naturally. Otherwise, every single change of color while dragging the color picker would be counted for undo/redo purposes

All the required functionality is covered but there are some improvements that I'd like to have covered:

- restrictRect in interact.js works correctly, but if select multiple boxes, we can drag elements out of bounds. I don't think interact.js has a native way to solve this, so maybe a custom solution should be in place here.
- I wanted to have debounce has well on box movement, since otherwise it's counted as separate movements.
- I would like to consider including disable status for undo/redo buttons. Still, some toolbars don't have this kind of behavior.
- Responsive design was out of scope for the exercise, but I feel it would be a good follow-up.

---

Welcome to this code test! :)

The main objective of this technical excercise is for you to get a good grasp of what kind of problems we encounter on Genially. We wouldn't want you to find some nasty surprises if you decide to join us. Also, it's a good starting point to have a technical conversation during an interview.

# Technology included

As you can see, the code test is a simple create-react-app, with some included libraries and some code bundled with it. Let's go through some of the lesser-known technologies.

## mobx-state-tree (MST for short)

This is the app state manager we use at our React apps. It's meant to be used with mobx, and unlike it, is very opinionated as how you should define your stores, models etc.

https://github.com/mobxjs/mobx-state-tree

## interact.js

Genially is a very interactivity-heavy application. Almost everything you use on the app can be moved around with your mouse, selected, scaled, rotated, etc. This library does most of the heavy lifting for us.

https://interactjs.io/

# Test requirements

The test is an extremely simplified version of the Genially editor. We provide you a working area, named `Canvas`, and elements that are displayed inside of it, named `Box`.

We've also added a rudimentary toolbar for some of the required functionality.

When finished, the app should let the user:

- Add and remove boxes.
- Select a box, which should visually indicate that is selected
- Drag the boxes around using interact.js and using React refs.
  - Keep in mind you should be able to drag a box even if it's not selected when the dragging starts.
- Changing a box's color.
- Display a counter indicating how many boxes are selected.
- Support selection, dragging and color changing for multiple boxes.
- Save the state of the app locally and restore it when it loads.
- Undo / Redo capabilities
  - **hint**: mobx-state-tree provides a middleware for this.

If you are unable to do some of the above, don't worry! But we would ask to at least explain what went wrong, how you would tackle the problem, or if you have no idea whatsoever 😃

Even if you manage to do everything, we also greatly appreciate comments on decisions you took, issues you faced or limitations you've left behind on purpose.

A good place to include those comments is the README.md of the repo.

# Delivery method

Send it to us however it suits you, but our preferred method is to get access to a **private fork of the repo**. This way, we can see historical changes, and a complete diff against the original repo on a PR. It's also a great way to write down feedback and discussion points for the interview afterwards.

If you opt for a fork with limited access, see the contact list below for people you can give access to. Please always include Chema & Román, and then someone else (or all of them!).

# Contact

If you have any questions about the test, you can contact any of us:

- Chema (<em>Github User [@chemitaxis](https://github.com/chemitaxis)</em> / chema@genially.com)
- Rafa (rafa@genially.com)
- Emanuel (emanuel@genially.com)
- Jesé (jese@genially.com)
- Román (roman@genially.com)
- Perico (perico@genially.com)
- Julio (juboba@genially.com)

Good Luck!
