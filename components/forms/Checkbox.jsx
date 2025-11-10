const Checkbox = ({ name = "name", title = "title", onChange , checked }) => {
  return (
    <>
      <section className="relative w-full flex justify-start items-center md:px-2">
        <input
        checked={checked}
        onChange={onChange}
          className="appearance-none 
    w-5 h-5 mx-1 
    border-2 border-pal1-400 
    rounded
    cursor-pointer
    transition-all duration-150
    checked:bg-pal1-400
    checked:border-pal1-400"
          type={"checkbox"}
          name={name}
          id={name}
        />
        <label
          className="text-slate-700 bg-white px-2 cursor-pointer selection:bg-transparent"
          htmlFor={name}
        >
          {title}
        </label>
      </section>
    </>
  );
};

export default Checkbox;
