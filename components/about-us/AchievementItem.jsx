import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedNumbers from "./animatedNumbers";
import { faGem } from "@fortawesome/free-regular-svg-icons";

const AchievementItem = ({
  icon = faGem,
  countStart = 0,
  countEnd = 100,
  timeDuration = 300,
  timeDelay = 0,
  title = "تعریف نشده",
  sign = ""
}) => {
  return (
    <>
      <section className="w-44 py-5 bg-back-gray border border-pal1-400 rounded overflow-hidden flex flex-col justify-center items-center gap-3">
        <div>
          <FontAwesomeIcon
            className="text-5xl text-pal1-400 text-center"
            icon={icon}
          />
        </div>
        <div className="text-3xl text-slate-800">
          <AnimatedNumbers
            start={countStart}
            end={countEnd}
            duration={timeDuration}
          />
          {sign}
        </div>
        <div>
          <span className="text-slate-600">{title}</span>
        </div>
      </section>
    </>
  );
};

export default AchievementItem;
