import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const initialFormData: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 假设登录成功后跳转到首页
    navigate("/dashboard");
  };

  return (
    <Form
      className="h-full w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={handleSubmit}
    >
      <Input
        isRequired
        errorMessage="请输入有效的邮箱"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="请输入邮箱"
        type="text"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
      />

      <Input
        isRequired
        errorMessage="请输入有效的密码"
        label="password"
        labelPlacement="outside"
        name="password"
        placeholder="请输入密码"
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
      />

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          登录
        </Button>
        <Button color="secondary" type="button" disabled>
          注册
        </Button>
      </div>
    </Form>
  );
}
