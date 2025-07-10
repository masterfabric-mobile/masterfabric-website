import React from "react";
import { Icon } from "@iconify/react";

type SocialIconName = "github" | "linkedin";

interface SocialIconProps {
  name: SocialIconName;
  className?: string;
  size?: number;
  color?: string;
  withBackground?: boolean;
  [key: string]: any;
}

const iconifyNames: Record<SocialIconName, string> = {
  github: "mdi:github",
  linkedin: "mdi:linkedin",
};

export const SocialIcon: React.FC<SocialIconProps> = ({
  name,
  className = "",
  size = 24,
  color,
  withBackground = false,
  ...props
}) => {

  if (name === "github" && withBackground) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          border: "0.5px solid #000000FF",
          borderRadius: 8,
          width: size,
          height: size,
        }}
        {...props}
      >
        <Icon icon={iconifyNames.github} color="#23272F" width={size * 0.7} height={size * 0.7} />
      </span>
    );
  }


  if (name === "linkedin" && withBackground) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: 8,
          width: size,
          height: size,
        }}
        {...props}
      >
        <Icon icon={iconifyNames.linkedin} color="#fff" width={size * 0.7} height={size * 0.7} />
      </span>
    );
  }


  return (
    <Icon
      icon={iconifyNames[name]}
      className={className}
      width={size}
      height={size}
      color={color}
      {...props}
    />
  );
}; 