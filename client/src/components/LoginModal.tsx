import Image from 'next/image'

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">로그인</h2>
        <button 
          className="flex items-center justify-center w-full bg-white border border-gray-300 rounded px-4 py-2 text-sm font-roboto text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleGoogleLogin}
        >
          <Image src="/images/google-logo.png" alt="Google" width={18} height={18} className="mr-2" />
          Login with Google
        </button>
        <button 
          className="mt-4 text-sm text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  )
}