import AchievementItem from "./AchievementItem";

const Achievements = () => {
  return (
    <>
      <div className="bg-back-gray py-14">
        <section className="container mx-auto">
          <span className="block mb-10 text-2xl text-slate-800 text-center">
            <b>دستاورد ها</b>
          </span>
          <section className="flex flex-col md:flex-row justify-center items-center gap-12">
            <AchievementItem
              title="دستگاه تعمیرشده"
              sign="+"
              countStart={0}
              countEnd={260}
              timeDuration={3500}
            />
            <AchievementItem
              title="رضایت خدمات فنی"
              sign="%"
              countStart={0}
              countEnd={98}
              timeDuration={3500}
            />
            <AchievementItem
              title="دوره آموزشی برگزارشده"
              sign="+"
              countStart={0}
              countEnd={16}
              timeDuration={3500}
            />
            <AchievementItem
              title="ویدیو اموزشی"
              sign="+"
              countStart={0}
              countEnd={130}
              timeDuration={3500}
            />
          </section>
        </section>
      </div>
    </>
  );
};

export default Achievements;
