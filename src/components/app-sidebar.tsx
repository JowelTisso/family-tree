import { type ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/lib/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/store/hook";
import { logoutHandler } from "@/services/authServices";
import { updateAuth } from "@/reducers/authSlice";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onItemClick = (path: string) => {
    navigate(path);
  };

  const checkIsActive = (path: string) => location.pathname === path;

  const onLogout = async () => {
    const response = await logoutHandler();
    if (response.status) {
      dispatch(
        updateAuth({
          loading: false,
          authenticated: false,
          user: {},
        })
      );
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center p-2">
          <div className="flex aspect-square size-8 items-center justify-center">
            <img src="/assets/icon.png" alt="logo" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-bold text-base ml-4">Family Tree</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={checkIsActive(item.url)}
                      className="active:bg-blue-50"
                    >
                      <a onClick={() => onItemClick(item.url)}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Button
          variant="secondary"
          className="cursor-pointer hover:bg-rose-50 active:bg-rose-100"
          onClick={onLogout}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
