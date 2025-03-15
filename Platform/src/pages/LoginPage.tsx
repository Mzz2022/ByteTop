import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full lg:flex-row flex-col p-0 mx-auto">
      <div className="lg:flex-[2] flex-0">
        <img
          alt="login background"
          className="relative h-full -z-1 object-cover lg:block hidden"
          src="https://img.freepik.com/free-vector/simple-blue-gradient-background-vector-business_53876-140900.jpg?t=st=1737893574~exp=1737897174~hmac=328d60db849a1f2a27cd72a91d5c3dab88dd9f474cd8ef8075b6bfb62115203c&w=826"
        />
      </div>

      <div className="flex-[3] flex flex-col justify-center items-center">
        <div className="p-8 w-max lg:h-auto h-1/2">
          <h1 className="mt-2.5 mb-7 text-4xl text-gray-800">
            欢迎使用 ByteTop！
          </h1>
          <p className="mb-4">提示: admin / admin</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
