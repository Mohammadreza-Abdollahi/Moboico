import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ActivityItem = ({icon , title , text}) => {
  return (
    <>
      <section className="w-80 md:w-96 group bg-white border border-pal1-300/40 rounded hover:-translate-y-5 hover:shadow-lg hover:scale-110 transition-all duration-150">
        <div className="text-center border-b border-pal1-600/40 py-20">
          <FontAwesomeIcon
            icon={icon}
            className="text-8xl text-pal1-400 group-hover:text-pal4-700 transition-all duration-150"
          />
        </div>
        <div className="text-center mx-auto py-4 px-5">
          <span className="text-2xl text-slate-800"><b>{title}</b></span>
          <p className="text-justify text-slate-700 my-4 leading-8">
            {text}
          </p>
        </div>
      </section>
    </>
  );
};

export default ActivityItem;
