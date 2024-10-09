
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  account_type: 'client' | 'freelancer';
};

const UserSignup = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
              First Name
            </label>
            <div className="mt-2">
              <input
                id="first_name"
                type="text"
                {...register("first_name", {
                  required: "First name is required",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-[15px]">{errors.first_name?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="last_name"
                type="text"
                {...register("last_name", {
                  required: "Last name is required",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-[15px]">{errors.last_name?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-[15px]">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-[15px]">{errors.password?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="account_type" className="block text-sm font-medium leading-6 text-gray-900">
              Account Type
            </label>
            <div className="mt-2">
              <select
                id="account_type"
                {...register("account_type", {
                  required: "Please select an account type",
                })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select account type</option>
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
              <p className="text-red-500 text-[15px]">{errors.account_type?.message}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <DevTool control={control} />

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;