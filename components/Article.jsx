import LiveTimestamp from "./LiveTimestamp"
import ReadMoreButton from "./ReadMoreButton"

function Article({ article }) {
  return (
    <article className="bg-slate-100 dark:bg-slate-800 flex flex-col rounded-lg
    shadow-sm hover:scale-105 hover:shadow-lg hover:bg-slate-200 transition-all
    duration-200 ease-out"
    >
      {
        article.urlToImage && (
          <img 
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-56 object-cover rounded-t-lg shadow-md"
          />
        )
      }

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col p-5">
          <h2 className="font-bold font-serif">{article.title}</h2>

          <section className="mt-2 flex-1">
            <p className="text-xs line-clamp-6">{article.description}</p>
          </section>

          <footer className="text-xs text-right ml-auto flex space-x-1 pt-5 italic text-gray-400">
            <p>{article.source_id} -</p>
            <p>
              <LiveTimestamp time={article.publishedAt} />
            </p>
          </footer>
        </div>

        {/* Read More Button */}
        <ReadMoreButton  article={article} />
      </div>
    </article>
  )
}

export default Article