import LoginForm from "./LoginForm";

const Register = () => {
  return (
    <>
      <section className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 w-11/12 md:w-3/5 lg:w-1/4 mx-auto py-10 px-3 shadow-2xl bg-white rounded">
        <span className="block text-2xl text-center mb-14 mt-6">
          <b>ورود</b>
        </span>
        <LoginForm/>
      </section>
    </>
  );
};

export default Register;
