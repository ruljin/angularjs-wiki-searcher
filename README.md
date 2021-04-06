# AngularJS Wiki Searcher

## Table of contents

- [General info](#general-info)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)

## General info

This project is an application that will look for the top 10 results in the Wikipedia API based on the searched phrase. The phrase will be highlighted in the results and give then a possibility to replace the first highlighted phrase (or all) with your own text. This is a browser based web application, so no installation is required.

<img src="https://res.cloudinary.com/dox1tzpb0/image/upload/v1617704210/example_1_uweslo.jpg">
<img src="https://res.cloudinary.com/dox1tzpb0/image/upload/v1617704210/example_2_oti0tv.jpg">
<img src="https://res.cloudinary.com/dox1tzpb0/image/upload/v1617704210/example_3_r8gv4o.jpg">

## Features

- The view contain the "search phrase", "replace with" input fields and three buttons: search, replace and replace all,
- Results are displayed as a list and contains result title and snipped fields,
- Search matches within each result snipped fields is highlighted,
- Request is invoked every 0.5 ms after user stop typing or when he click search button,
- Replace is replacing first currently available highlighted search match with a phrase taken from "replace with" field,
- Replace all is replacing every highlighted search match with a phrase taken from "replace with" field.

## Technologies

- HTML
- CSS
- BEM methodology
- AngularJS

## Setup

#### Getting started

If you want to run the application on the local machine, follow these steps:

1. Clone down this repo
2. Install dependencies with the command: `npm install`
3. Start development server `npm start`

The application will be available at `localhost:8000`
