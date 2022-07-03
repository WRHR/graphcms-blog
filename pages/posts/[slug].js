
import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-us-west-2.graphcms.com/v2/cl55s46tq3m9601ug1vm5e1gc/master"
);

const QUERY = gql`
  query Post($slug: String!){
    post(where: {slug: $slug}){
      id, 
      title,
      slug,
      datePublished,
      author{
        id,
        name,
        avatar{
          url
        }
      }
      content{
        html
      }
      coverPhoto{
        id,
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;
export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
  };
}

const BlogPost = ({ post }) => {
  return (
    <main>
      <img src={post.coverPhoto.url} alt="" />
      <div>
        <img src={post.author.avatar.url} alt="" />
        <div>
          <h6>By {post.author.name}</h6>
          <h6>{post.datePublished}</h6>
        </div>
        <div dangerouslySetInnerHTML={{__html: post.content.html}}></div>
      </div>
    </main>
    );
};

export default BlogPost;
