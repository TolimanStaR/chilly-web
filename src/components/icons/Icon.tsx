import React from "react";
import * as Icons from "./svg";

export const icons = {
  account: Icons.Account,
  admin: Icons.Admin,
  bell: Icons.Bell,
  bellBadge: Icons.BellBadge,
  checkboxBlank: Icons.CheckboxBlank,
  checkboxChecked: Icons.CheckboxChecked,
  chevronDown: Icons.ChevronDown,
  chevronLeft: Icons.ChevronLeft,
  chevronRight: Icons.ChevronRight,
  chevronUp: Icons.ChevronUp,
  chilly: Icons.Chilly,
  close: Icons.Close,
  edit: Icons.Edit,
  eye: Icons.Eye,
  eyeOff: Icons.EyeOff,
  forum: Icons.Forum,
  info: Icons.Info,
  link: Icons.Link,
  live: Icons.Live,
  location: Icons.Location,
  logout: Icons.Logout,
  members: Icons.Members,
  menu: Icons.Menu,
  photo: Icons.Photo,
  plus: Icons.Plus,
  radioBlank: Icons.RadioBlank,
  radioChecked: Icons.RadioChecked,
  submit: Icons.Submit,
  template: Icons.Template,
};

type IconProps = {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = "currentColor", className }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }

  return (
    <IconComponent size={size} color={color} className={className}/>
  );
};
