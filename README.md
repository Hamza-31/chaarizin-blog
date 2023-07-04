# Chaarizin

[Chaarizin](http://www.chaarizin.ma/) web site is an e-commerce blog, built with built with [Next.js 13](https://nextjs.org/).

## Project developper

- Github: [@Hamza-31](https://github.com/Hamza-31)
- [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Hamza-31/chaarizin-blog.git
```

Go to the project directory

```bash
  cd chaarizin-blog
```

Install dependencies

```bash
  npm install
```

Start the developement server

```bash
  npm run dev
```

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
```

## API Reference

#### Get all items

```http
  GET /api/deliveries
```

| Parameter     | Type     | Description                |
| :------------ | :------- | :------------------------- |
| `accessToken` | `string` | **Required**. Access Token |

#### Get item

```http
  GET /api/blog/${slug}
```

| Parameter    | Type      | Description                           |
| :----------- | :-------- | :------------------------------------ |
| `slug` | `string` | **Required**. Id of article to fetch |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CHAARIZIN_URL`

`JWT_SECRET`

`NEXTAUTH_URL`

`NEXTAUTH_SECRET`

`GOOGLE_CLIENT_ID`

`GOOGLE_CLIENT_SECRET`

`NEXT_PUBLIC_STRAPI_API_URL`

`NEXT_PUBLIC_MEILISEARCH_HOST`

`NEXT_PUBLIC_MEILISEARCH_MASTER_KEY`

`INSTAGRAM_CLIENT_SECRET`

`INSTA_CLIENT`

`INSTAGRAM_APP_SECRET`

`SENDGRID_API_KEY`

`SENDGRID_EMAIL_FROM`

`SENDGRID_EMAIL_TO`

## 🔗 Usefull Links

NextJS doc : [Next.js](https://nextjs.org/).

ReactJS doc : [React.js](https://reactjs.org/).

NextAuth doc : [NextAuth](https://next-auth.js.org/).

Tailwind doc : [Material UI](https://tailwindcss.com/).

Meilisearch doc : [Meilisearch](https://https://www.meilisearch.com//).

Formik doc : [Formik](https://formik.org/).
