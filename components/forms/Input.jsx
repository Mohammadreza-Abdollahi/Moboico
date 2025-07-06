const Input = ({ formParams }) => {
  return (
    <>
      <section className="relative w-full">
        <label
          className="absolute -top-3 right-3 text-slate-700 bg-white px-2"
          htmlFor={formParams.id}
        >
          {formParams.label || "عنوان پیشفرص"}
        </label>
        <input
          className="w-full text-slate-800 py-2.5 px-2 border-2 border-pal1-400 focus:border-pal4-600 rounded outline-none transition-all duration-150"
          type={formParams.type || "text"}
          name={formParams.name}
          id={formParams.id}
          placeholder={formParams.placeholder || ""}
        />
      </section>
    </>
  );
};

export default Input;
