import * as Tooltip from "@radix-ui/react-tooltip";
import type { FC, ReactNode } from "react";

type CustomTooltipProps = {
  children: ReactNode;
  message: string;
  asChild?: boolean;
};

const CustomTooltip: FC<CustomTooltipProps> = ({
  children,
  message,
  asChild = false,
}) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild={asChild}>{children}</Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className="rounded bg-zinc-100 px-2 py-1 font-normal shadow-md dark:bg-zinc-800"
            side="bottom"
          >
            {message}
            <Tooltip.Arrow className="fill-zinc-100 shadow-md dark:fill-zinc-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
