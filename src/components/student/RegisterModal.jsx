import { useState } from "react";
import { X, Eye } from "lucide-react";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Ім’я користувача</label>
            <input
              type="text"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Ел. пошта</label>
            <input
              type="email"
              className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Пароль</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Підтвердження паролю</label>
            <div className="relative mt-1">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition">
            Вхід
          </button>

          <p className="text-sm text-center">
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
    </div>
  );
}
