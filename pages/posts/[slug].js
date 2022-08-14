import React from 'react'
import { GraphQLClient, gql } from "graphql-request";
const graphqlcms = new GraphQLClient(
  "https://api-eu-central-1.hygraph.com/v2/cl6nnawkm030501tbb3qkexao/master"
);

const QERY = gql`
  query Posts($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      author {
        id
        name
        avatar {
          url
        }
      }
    }
  }
`;


const SLUGLIST = gql`
{
  posts{
    slug
  }
}
`

export async function getStaticPaths() {
  const { posts } = await graphqlcms.request(SLUGLIST);
  return  {
    paths : posts.map(post=>({params:{slug:post.slug}})),
    fallback:false
  }
}


export async function getStaticProps({params}) {
  const slug = params.slug
  const data = await graphqlcms.request(QERY,{slug});
  const post = data.post

  return {
    props: {
      post
    },
  };
}

const Detail = ({post}) => {
  console.log(post)
  return (
    <div>
      <h1>{post.title}</h1>
      <h3>{post.author.name}</h3>
      </div>
  )
}

export default Detail