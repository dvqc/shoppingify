<h1 align="center">Shoppingify</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://shoppingify-dvqc.vercel.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/dvqc/shoppingify">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

<div align="center">
<h4>
This is <a href="https://unsplash.com/">Shoppingify</a>, a web app that lets you create your shopping list and take it wherever you go.
</h4>
<div >
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop1.png?raw=true" alt="Desktop UI 1"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop2.png?raw=true" alt="Desktop UI 2"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop3.png?raw=true" alt="Desktop UI 3"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop4.png?raw=true" alt="Desktop UI 4"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop5.png?raw=true" alt="Desktop UI 5"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop6.png?raw=true" alt="Desktop UI 6"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/desktop7.png?raw=true" alt="Desktop UI 7"/>
</div>
<div>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/mobile1.png?raw=true" alt="Mobile UI 1"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/mobile2.png?raw=true" alt="Mobile UI 2"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/mobile3.png?raw=true" alt="Mobile UI 3"/>
<img src="https://github.com/dvqc/shoppingify/blob/main/public/images/mobile4.png?raw=true" alt="Mobile UI 4"/>
</div>
</div>

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/mGd5VpbO4JnzU6I9l96x) was to build an application to complete the given user stories:

- User story: When I select the items tab, I can see a list of items under different categories.
- User story: I can add a new item with name, category, note, and image.
- User story: When I add a new item, I can select one from the existing categories or add a new one if the category does not exist
- User story: When I select an item, I can see its details and I can choose to add the current list or delete the item.
- User story: I can add items to the current list
- User story: I can increase the number of item in the list
- User story: I can remove the item from the list
- User story: I can save/update the list with a name (user can have only one active list at a time)
- User story: I can toggle between editing state and completing state
- User story: When I am at completing state, I can save my progress by selecting the item
- User story: I can cancel the active list
- User story: When I try to cancel a list, I can see a confirmation notification
- User story: I can see my shopping history and I can see the details of it
- User story: I can see some statistics: top items, top categories, and monthly comparison. (Tips: use libraries like recharts for the graph)
- User story (optional): I can search for items

More features were added such as authentication ,authorisations and mobile first design.

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dvqc/shoppingify.git

# Install dependencies
$ npm install

# Run the app
$ npm run start
```

You will also need to set some environment variables:

1. Set the database connection url

```bash
# .env

# Specify the url of your database connection that is going to be used by the prisma client.
# You will need a MongoDB instance, you can get one from https://www.mongodb.com/
DATABASE_URL="mongodb+srv://username:password@host/db_name"
```

2. Specify your google app credentials, you can get these from [google](https://console.cloud.google.com/apis/credentials). Remember to set the authorised redirect URI to `https://your-domain/api/auth/callback/google`

```bash
# .env

GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
```

3. Set your [github oauth app](https://github.com/settings/developers) credentials. Your authirization call back url should be `https://your-domain/api/auth`

```bash
# .env

GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret

```

4. Generate the prisma client api by running the following command in your project's root directory:

```bash
npx prisma generate
```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example: -->

- [MongoDB](https://www.mongodb.com/) for their free database hosting tier.
- [SWR](https://swr.vercel.app/), a lightweight react hooks library for data fetching.
- [NextAuth.js](https://next-auth.js.org/), an open-source authentication solution for Next.js applications.
- [Chart.js](https://www.chartjs.org/) , a free and open-source JavaScript library for data visualization.

## Contact

- Website [b-ibrahim](https://b-ibrahim.vercel.app/)
- GitHub [@dvqc](https://github.com/dvqc)
