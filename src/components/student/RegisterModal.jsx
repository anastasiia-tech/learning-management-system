import { useState } from "react";
import { X, Eye } from "lucide-react";
import axios from "axios";
import { strings } from "../../strings"; // Шлях підлаштуй під структуру свого проекту

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: null,
    email: null,
    password: null,
    passwordConfirmation: null,
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
    setFieldErrors({
      name: null,
      email: null,
      password: null,
      passwordConfirmation: null,
    });
    setGeneralError(null);
    setSuccess(null);

    try {
      const res = await axios.post("/api/v1/auth/register", form);
      setSuccess("Реєстрація пройшла успішно!");
      console.log("Реєстрація успішна:", res.data);

      // Очищення полів форми після успішної реєстрації
      setForm({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      });

      // Якщо треба, можна тут автоматично закрити модал або переключити на логін
      // onClose();
      // onSwitchToLogin();
    } catch (err) {
      const errData = err.response?.data?.error;

      if (errData) {
        if (typeof errData === "object") {
          setFieldErrors({
            name: errData.name || null,
            email: errData.email || null,
            password: errData.password || null,
            passwordConfirmation: errData.passwordConfirmation || null,
          });

          if (errData.message) {
            setGeneralError(errData.message);
          }
        } else if (typeof errData === "string") {
          setGeneralError(errData);
        } else if (errData.message) {
          setGeneralError(errData.message);
        } else {
          setGeneralError(JSON.stringify(errData));
        }
      } else {
        setGeneralError(strings.registerError);
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

        <h2 className="text-xl font-bold text-center mb-1">
          Створіть свій акаунт
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Ласкаво просимо! Будь ласка, заповніть дані, щоб розпочати.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="text-sm font-medium">{strings.name}</label>
            <input
              name="name"
              type="text"
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.name
                  ? "border-red-600 focus:ring-red-600"
                  : "focus:ring-blue-500"
              }`}
              value={form.name}
              onChange={handleChange}
              required
            />
            {fieldErrors.name && (
              <p className="mt-1 text-left text-red-600 text-sm">
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">{strings.emailShort}</label>
            <input
              name="email"
              type="email"
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.email
                  ? "border-red-600 focus:ring-red-600"
                  : "focus:ring-blue-500"
              }`}
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
            <label className="text-sm font-medium">{strings.password}</label>
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

          <div>
            <label className="text-sm font-medium">
              {strings.passwordConfirmation}
            </label>
            <div className="relative mt-1">
              <input
                name="passwordConfirmation"
                type={showConfirm ? "text" : "password"}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.passwordConfirmation
                    ? "border-red-600 focus:ring-red-600"
                    : "focus:ring-blue-500"
                }`}
                value={form.passwordConfirmation}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                tabIndex={-1}
              >
                <Eye size={18} />
              </button>
            </div>
            {fieldErrors.passwordConfirmation && (
              <p className="mt-1 text-left text-red-600 text-sm">
                {fieldErrors.passwordConfirmation}
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
          Вже маєте обліковий запис?{" "}
          <button
            onClick={() => {
              onClose();
              onSwitchToLogin();
            }}
            className="font-semibold underline text-blue-600 hover:text-blue-800"
          >
            Увійти
          </button>
        </p>
      </div>
    </div>
  );
}
