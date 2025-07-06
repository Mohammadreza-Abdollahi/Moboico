import Input from "./Input";
import Password from "./Password";

const FormControler = ({ type, formParams }) => {
  if (type === "input") {
    return <Input formParams={formParams} />;
  } else if (type === "password") {
    return <Password formParams={formParams} />;
  }
};

export default FormControler;
