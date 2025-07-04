import ArticleItem from "@/components/articles/ArticleItem";
import Loading from "@/components/loading";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const getArticles = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/articles`);
  return res.json();
};
const BlogPage = async () => {
  const articles = (await getArticles()) || [];
  return (
    <>
      <section className="bg-back-gray pt-8 pb-20">
        <section className="container mx-auto">
        <section className="flex justify-between items-center">
            <div className="flex-4/12 md:flex-2/12 text-center">
              <span className="md:text-2xl text-slate-800">همه مقالات</span>
            </div>
            <hr className="flex-4/12 md:flex-8/12 text-center text-pal4-600"/>
            <div className="flex-4/12 md:flex-2/12 text-center">
              <select
                name="sorting"
                id="sorting-select"
                className="w-24 text-center md:text-lg text-slate-700 appearance-none focus:outline-2 focus:outline-pal1-400/20 rounded-sm"
              >
                <option value="latest">جدیدترین</option>
                <option value="most-popular">پربازدیدترین</option>
                <option value="most-tidy">مرتب ترین</option>
              </select>
              <FontAwesomeIcon icon={faListUl}/>
            </div>
          </section>
          <section className="flex justify-center items-stretch flex-wrap gap-5 mt-10">
            {articles.length !== 0 ? (
              articles.map((item) => (
                <ArticleItem
                  key={item.id}
                  title={item.title}
                  text={item.text}
                  alt={item.alt_Img}
                  date={item.date}
                  id={item.id}
                  src={item.img}
                />
              ))
            ) : (
              <Loading />
            )}
          </section>
        </section>
      </section>
    </>
  );
};

export default BlogPage;
