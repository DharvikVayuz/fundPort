
export const AuthLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-row sm:px-12 p-2 sm:py-4 gap-12">
      <div className="hidden md:block w-[50%] overflow-hidden">
        <img
          src="/images/auth/auth-main.svg"
          alt="auth-main"
          className="w-full h-full xl:object-center xl:object-cover rounded-md"
        />
      </div>
      <div className="w-full md:w-[50%] h-full flex flex-col justify-center pt-2">
        {children}
      </div>
    </div>
  );
};
