import { useState } from "react";
import { X, Eye } from "lucide-react";
import axios from "axios";
import { strings } from "../../strings";

export default function LoginModal({ onClose, onSwitchToRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    email: null,
    password: null,
  });

  const [generalError, setGeneralError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setFieldErrors((prev) => ({ ...prev, [name]: null }));
    setGeneralError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFieldErrors({ email: null, password: null });
    setGeneralError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/api/v1/auth/login", form);
      setSuccess("Вхід успішний!");
      console.log("Успішний логін:", res.data);

      // Очищення полів після успішного входу
      setForm({ email: "", password: "" });

      // localStorage.setItem('token', res.data.token);
      // onClose();
    } catch (err) {
      console.error(err);

      const errData = err.response?.data?.error;

      if (errData) {
        if (
          typeof errData === "object" &&
          (errData.email || errData.password)
        ) {
          setFieldErrors({
            email: errData.email || null,
            password: errData.password || null,
          });
        } else if (typeof errData === "string") {
          setGeneralError(errData);
        } else if (errData.message) {
          setGeneralError(errData.message);
        } else {
          setGeneralError(JSON.stringify(errData));
        }
      } else {
        setGeneralError(strings.loginError);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[376px] relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-center">Увійдіть до системи</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          З поверненням! Будь ласка, увійдіть, щоб продовжити.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="text-sm font-medium">Ел. пошта</label>
            <input
              name="email"
              type="email"
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.email
                  ? "border-red-600 focus:ring-red-600"
                  : "focus:ring-blue-500"
              }`}
              placeholder="email@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            {fieldErrors.email && (
              <p className="mt-1 text-left text-red-600 text-sm">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Пароль</label>
            <div className="relative mt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.password
                    ? "border-red-600 focus:ring-red-600"
                    : "focus:ring-blue-500"
                }`}
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                <Eye size={18} />
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-left text-red-600 text-sm">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
          >
            Вхід
          </button>

          {generalError && (
            <p className="mt-2 text-left text-red-600 text-sm">
              {generalError}
            </p>
          )}
          {success && (
            <p className="mt-2 text-left text-green-600 text-sm">{success}</p>
          )}
        </form>

        <p className="text-sm text-center mt-4">
          Немає облікового запису?{" "}
          <button
            onClick={() => {
              onClose();
              onSwitchToRegister();
            }}
            className="font-semibold underline text-blue-600 hover:text-blue-800"
          >
            Зареєструватись.
          </button>
        </p>
      </div>
    </div>
  );
}
