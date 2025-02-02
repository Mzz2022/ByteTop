import React from "react";
import {Tabs, Tab, Input, Link, Button, Card, CardBody} from "@heroui/react";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
}

const initialFormData: LoginFormData = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Partial<LoginFormData> = {};
    
    if (!formData.username) {
      newErrors.username = "用户名不能为空";
    } else if (formData.username.length < 3) {
      newErrors.username = "用户名长度至少3个字符";
    }
    
    if (!formData.password) {
      newErrors.password = "密码不能为空";
    } 
    // else if (formData.password.length < 6) {
    //   newErrors.password = "密码长度至少6个字符";
    // }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // 假设登录成功后跳转到首页
      if (formData.username === "admin" && formData.password === "admin") {
        navigate("/dashboard");
      } else {
        setErrors({ password: "用户名或密码错误", username: "用户名或密码错误"});
      }
    }
  };

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    // 清除对应字段的错误信息
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const [selected, setSelected] = React.useState<React.Key>("login");

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-full pb-1">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="登录">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Input
                  isRequired
                  label="用户名"
                  placeholder="请输入用户名"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange("username")}
                  errorMessage={errors.username}
                  isInvalid={!!errors.username}
                />
                <Input
                  isRequired
                  label="密码"
                  placeholder="请输入密码"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                />
                <div className="flex gap-2 justify-end mt-2">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="注册" isDisabled>
              <form className="flex flex-col gap-4 h-[300px]">
                <Input isRequired label="Name" placeholder="Enter your name" type="password" />
                <Input isRequired label="username" placeholder="Enter your username" type="username" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
