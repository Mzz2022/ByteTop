import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Dropdown,
  Avatar,
} from "@heroui/react";
import {
  FaChartBar,
  FaUserFriends,
  FaMapMarkedAlt,
  FaMobileAlt,
  FaUserCircle,
  FaHeart,
  FaChartLine,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ThemeSwitch } from "@/components/ThemeSwitch"; // 导入主题切换组件

interface ChevronDownProps {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}

export const ChevronDown = ({
  fill,
  size,
  height,
  width,
  ...props
}: ChevronDownProps) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};

interface IconProps {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any;
}

export const Scale = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}: IconProps) => {
  return (
    <svg
      fill="none"
      height={size || height}
      viewBox="0 0 24 24"
      width={size || width}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7ZM18 6 6 18"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M18 10V6h-4M6 14v4h4"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const NavigationBar = () => {
  return (
    <Navbar className="bg-white shadow-md">
      {" "}
      {/* 设置背景为白色并添加阴影 */}
      <NavbarBrand>
        <p className="font-bold text-inherit text-gray-800">Platform</p>{" "}
        {/* 深色文字 */}
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-800"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                数据
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Platform features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="data_overview"
              description="查看整体数据趋势和关键指标"
              href="/data/overview"
              startContent={
                <FaChartBar size={30} style={{ color: "#FFD700" }} />
              }
            >
              数据总揽
            </DropdownItem>
            <DropdownItem
              key="data_analytics"
              description="深入分析数据维度和用户行为"
              href="/data/analytics"
              startContent={
                <FaUserFriends size={30} style={{ color: "#FF69B4" }} />
              }
            >
              数据概览
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-800"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                访客分析
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Platform features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="visitor_customer_type"
              description="分析新客户与回头客的比例及行为差异"
              href="/visitors/customer-type"
              startContent={
                <FaUserFriends size={30} style={{ color: "#FF4500" }} />
              }
            >
              新老顾客
            </DropdownItem>
            <DropdownItem
              key="visitor_geography"
              description="查看用户地域分布及区域特征"
              href="/visitors/geography"
              startContent={
                <FaMapMarkedAlt size={30} style={{ color: "#32CD32" }} />
              }
            >
              地域分析
            </DropdownItem>
            <DropdownItem
              key="visitor_devices"
              description="统计不同设备类型的访问情况"
              href="/visitors/devices"
              startContent={
                <FaMobileAlt size={30} style={{ color: "#1E90FF" }} />
              }
            >
              设备分析
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-800"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                用户分析
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Platform features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="user_images"
              description="查看用户画像及特征分析"
              href="/users/image"
              startContent={
                <FaUserCircle size={30} style={{ color: "#8A2BE2" }} />
              }
            >
              用户画像
            </DropdownItem>
            <DropdownItem
              key="user_loyalty"
              description="分析用户留存率和忠诚度指标"
              href="/users/loyalty"
              startContent={<FaHeart size={30} style={{ color: "#DC143C" }} />}
            >
              忠诚度分析
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-gray-800"
                endContent={<ChevronDown fill="currentColor" size={16} />}
                radius="sm"
                variant="light"
              >
                性能
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Platform features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="performance_analysis"
              description="监测页面加载速度与性能指标"
              href="/performance/analysis"
              startContent={
                <FaChartLine size={30} style={{ color: "#4169E1" }} />
              }
            >
              性能分析
            </DropdownItem>
            <DropdownItem
              key="performance_crash"
              description="追踪页面异常与崩溃情况统计"
              href="/performance/crash"
              startContent={
                <FaExclamationTriangle size={30} style={{ color: "#FF4500" }} />
              }
            >
              页面崩溃分析
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile_info">
                <p className="font-semibold">访客登录</p>
              </DropdownItem>
              {/* <DropdownItem key="profile_settings">My Settings</DropdownItem>
              <DropdownItem key="profile_team_settings">
                Team Settings
              </DropdownItem>
              <DropdownItem key="profile_analytics">Analytics</DropdownItem>
              <DropdownItem key="profile_system">System</DropdownItem>
              <DropdownItem key="profile_configurations">
                Configurations
              </DropdownItem>
              <DropdownItem key="profile_help">Help & Feedback</DropdownItem> */}
              <DropdownItem key="profile_logout" color="danger">
                <p className="font-semibold">Log In</p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavigationBar;
