import Loading from "@/components/loading";
import TutorialItem from "@/components/tutorials/TutorialItem";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const getTutorials = async () => {
  const res = await fetch(`${process.env.SITE_URL}/api/tutorials`, {
    next: { revalidate: 600 },
  });
  return res.json();
};
const TutorialsPage = async () => {
  const tutorials = (await getTutorials()) || [];
  return (
    <>
      <section className="container mx-auto pt-8">
        <section className="flex justify-between items-center">
          <div className="flex-4/12 md:flex-2/12 text-center">
            <span className="md:text-2xl text-slate-800">همه آموزش ها</span>
          </div>
          <hr className="flex-4/12 md:flex-8/12 text-center text-pal1-400" />
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
            <FontAwesomeIcon icon={faListUl} />
          </div>
        </section>
        <section className="flex justify-center items-stretch flex-wrap gap-5 mt-10">
          {tutorials.length !== 0 ? (
            tutorials.map((item) => (
              <TutorialItem
                id={item.id}
                key={item.id}
                title={item.title}
                img={item.img}
                altImg={item.altImg}
                teacher={item.teacher}
                duration={item.duration}
                content={item.content}
                createdAt={item.createdAt}
              />
            ))
          ) : (
            <Loading/>
          )}
        </section>
      </section>
    </>
  );
};

export default TutorialsPage;
