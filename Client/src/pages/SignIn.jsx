import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/user.slice";
// import OAuth from "../Components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {error,loading}=useSelector((state)=>state.user);
  // const [setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // console.log(formData,'formData')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", formData);
      if (res.data.success === false) {
        // setLoading(false);
        // setError(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      // setLoading(false);
      dispatch(signInSuccess);
      if (error.response) {
        // setError(error.response.data.message);
        dispatch(signInFailure(error.response.data.message));
      } else {
        // setError(error.message);
        dispatch(signInFailure(error.message));
      }
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg border-[#8e6767]"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg border-[#8e6767]"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer"
        >
          {loading ? "Loading..." : "Sign In  "}
        </button>
        {/* <OAuth/> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignIn;
