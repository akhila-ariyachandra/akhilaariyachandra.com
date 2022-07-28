import NavLink from "./NavLink";
import * as Dialog from "@radix-ui/react-dialog";
import type { FC, Dispatch, SetStateAction, ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface NavDialog {
  isOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  navLinks: { label: string; href: string; activePath: RegExp }[];
  trigger: ReactNode;
}

const NavDialog: FC<NavDialog> = ({
  isOpen,
  setDialogOpen,
  navLinks,
  trigger,
}) => {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild onClick={() => setDialogOpen(true)}>
        {trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-30 grid place-items-center bg-black bg-opacity-80 backdrop-blur-sm">
          <Dialog.Content
            className="m-4 w-full max-w-xs"
            onInteractOutside={() => setDialogOpen(false)}
          >
            <Dialog.Close asChild onClick={() => setDialogOpen(false)}>
              <button className="p-2 text-lg text-zinc-800 dark:text-zinc-200">
                <MdClose />
              </button>
            </Dialog.Close>

            <div className="flex h-full flex-col gap-3 rounded-md bg-white py-2 px-4 dark:bg-zinc-900">
              {navLinks.map(({ label, href, activePath }) => (
                <NavLink key={href} href={href} activePath={activePath}>
                  {label}
                </NavLink>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default NavDialog;
