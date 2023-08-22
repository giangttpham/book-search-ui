# Book Search UI

### Overview

This is a NextJs app with Tailwind CSS. The UI contains:

- A search bar where users can enter keywords for a book search
- A container to display the list of books returned by the API call
- Simple navigation buttons used for result pagination

### Run locally

To run this code locally for development, run `npm install` and then run one of the following commands

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployed on Vercel

This app is deployed on [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). To visit the current deployment, follow this link https://book-search-ui-git-master-giangttpham.vercel.app/

### Testing with Cypress

- To run tests through Cypress UI, run `npm cypress`. Choose `Component Testing` and then select the browser where the tests will run.
- To run tests headlessly, run `npm run cy:run -- --component`
