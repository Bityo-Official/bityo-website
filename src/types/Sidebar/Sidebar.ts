export interface SidebarProps {
  ListData: SidebarListItemProps[];
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
}

export interface SidebarListItemProps {
  icon: React.ElementType;
  link: string;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  chip?: {
    value: string;
    size: 'sm' | 'md' | 'lg';
    color: "blue-gray" | "gray" | "brown" | "deep-orange" | "orange" | "amber" | "yellow" | "lime" | "light-green" | "green" | "teal" | "cyan" | "light-blue" | "blue" | "indigo" | "deep-purple" | "purple" | "pink" | "red";
  };
}