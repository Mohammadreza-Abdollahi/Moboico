import Image from "next/image";

const SliderItem = ({img = "" , alt = "" , head = "" , head2 = "" , text = "" , text2 = ""}) => {
  return <>
        <section className="relative w-full h-[40vh] lg:h-[88vh] mx-auto">
            <Image className="z-0 w-full h-full" src={img} width={1120} height={760} alt={alt}/>
            <section className="absolute top-0 right-0 w-full h-full flex items-center z-50 bg-gradient-to-l lg:from-black/60 lg:via-black/60  lg:to-black/0 from-black/50 to-black/50">
                <section className="container mx-auto flex items-center justify-center lg:justify-start">
                    <div className="lg:w-1/2 text-center lg:text-start px-8">
                        <h1 className="text-white text-lg lg:text-3xl mb-6 lg:text-justify">{head}</h1>
                        <h1 className="text-white text-lg lg:text-3xl mb-6 lg:text-justify">{head2}</h1>
                        <p className="text-white text-lg hidden lg:inline-block lg:text-justify">{text}</p>
                        <p className="text-white text-lg hidden lg:inline-block lg:text-justify">{text2}</p>
                    </div>
                    <div className="hidden lg:w-1/2"></div>
                </section>
            </section>
        </section>
  </>;
};

export default SliderItem;
