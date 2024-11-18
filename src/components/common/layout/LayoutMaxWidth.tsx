import StyleConstant from "@/utils/common/StyleConstant.Common";
import { FC, ReactNode } from "react";

const LayoutMaxWidth: FC<{ children: ReactNode; color?: string }> = ({
  children,
  color,
}) => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        backgroundColor: color ?? StyleConstant.BG,
      }}
    >
      <div
        style={{
          maxWidth: 880,
          paddingRight: 16,
          paddingLeft: 16,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutMaxWidth;
