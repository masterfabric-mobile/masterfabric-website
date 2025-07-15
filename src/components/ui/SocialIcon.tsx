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
  size = 32,
  color,
  withBackground = false,
  ...props
}) => {
  // Modern, flat, shadowed style for navbar
  if (withBackground) {
    if (name === "github") {
      return (
        <span
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 7,
            width: size,
            height: size,
            transition: "transform 0.18s cubic-bezier(.4,1.2,.6,1), box-shadow 0.18s cubic-bezier(.4,1.2,.6,1)",
          }}
          {...props}
        >
          <Icon icon={iconifyNames.github} color="#18181b" width={36} height={36} />
        </span>
      );
    }
    if (name === "linkedin") {
      return (
        <span
          className={className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 7,
            width: size,
            height: size,
            transition: "transform 0.18s cubic-bezier(.4,1.2,.6,1), box-shadow 0.18s cubic-bezier(.4,1.2,.6,1)",
          }}
          {...props}
        >
          <Icon icon={iconifyNames.linkedin} color="#2563eb" width={36} height={36} />
        </span>
      );
    }
  }
  // Fallback: icon only
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