const Select = ({
  title = "title",
  name = "name",
  data = [],
  value = "value",
  onChange,
}) => {
  return (
    <>
      <section className="relative w-full">
        <label
          className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
          htmlFor="category"
        >
          {title}
        </label>
        <select
          onChange={onChange}
          value={value}
          name={name}
          id={name}
          className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
        >
          <option value=" ">انتخاب نشده</option>
          {data.map((item, index) => (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </section>
    </>
  );
};

export default Select;
