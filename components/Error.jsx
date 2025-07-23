const Error = ({
  text = "متن اروری تنظیم نشده",
  type = "danger",
  textSize = "sm",
}) => {
  let colors = "";
  switch (type) {
    case "danger":
      colors = "bg-red-100 text-red-900";
      break;
    case "success":
      colors = "bg-green-100 text-green-900";
      break;
    case "warning":
      colors = "bg-amber-100 text-amber-900";
      break;
    case "info":
      colors = "bg-blue-100 text-blue-900";
      break;
  }
  return (
    <>
      <span
        className={`block w-full px-2 py-3 rounded text-center ${
          "text-" + textSize
        } ${colors}`}
      >
        {text}
      </span>
    </>
  );
};

export default Error;
