import { type } from "os";
import { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  isBorder?: boolean;
};

export default function Button({ isBorder = false, ...props }: ButtonProps) {
  return (
    <button
      data-isBorder={isBorder}
      className=" text-sm sm:text-lg 2xl:text-xl rounded-2xl text-white bg-purple-500 text-md py-1 sm:px-10  sm:py-2  w-[40%] sm:w-[60%]  md:w-[50%] lg:w-[34%] 2xl:w-[35%] 2xl:h-[65%] 2xl:py-4 flex items-center justify-center data-[isBorder=true]:bg-white border-[1px] data-[isBorder=true]: border-purple-500  data-[isBorder=true]:text-black"
      {...props}
    />
  );
}
