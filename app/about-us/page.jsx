import AchievementItem from "@/components/about-us/AchievementItem";
import AnimatedNumbers from "@/components/about-us/AnimatedNumbers";
import Image from "next/image";
import CooperateForm from "../../components/about-us/CooperateForm";
import Achievements from "@/components/about-us/Achievements";
import AboutUs from "@/components/about-us/AboutUs";

const AboutUsPage = () => {
  return (
    <>
      <section>
        <div className="pt-10">
          <AboutUs />
          <section className="mb-1b">
            <Achievements />
          </section>
          <section className="mt-16">
            <CooperateForm />
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
