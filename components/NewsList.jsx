import Article from "./Article"

function NewsList({ news }) {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 gap-10">
      {
        news?.map(article => (
          <Article key={article.title} article={article} />
        ))
      }
    </main>
  )
}

export default NewsList