
export let postsurl = "api/posts/page-<page>.json";

export function post(post) {
  return {
    class: `post flex flex-col sm:flex-row items-center max-w-md px-8 py-4 border border-gray-700 rounded bg-gray-800 text-left m-5`,
    html: [
      {
        class: "text-5xl font-bold mr-4",
        html: '#' + post.id
      }, {
        html: [
          {
            html: post.title
          },
          {
            class: "text-sm text-gray-600",
            html: post.body
          }
        ]
      }
    ]
  }
}