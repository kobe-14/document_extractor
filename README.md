# Document Extractor

## This application highlights the keys fields in the document receieved from backend and user can approve the fields, etc.,

Document extractor is canvas based application, where the image is drawn on the canvas and the coordinates of the text extracted is highlighted.

## Features

- Displays list of fleids
- Displays the document over a canvas
- Select the fields to highlight it in the document
- Delete a particular field
- Approve the selected fields

## Tech

Document Extractor uses a number of open source projects to work properly:

- [NextJS] - React framework for building the components
- [Canvas] - To draw and highlights fields on the document

## Installation

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/kobe-14/document_extractor.git
cd document_extractor
npm i
npm run dev
```

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[Canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
[NextJS]: https://nextjs.org/
