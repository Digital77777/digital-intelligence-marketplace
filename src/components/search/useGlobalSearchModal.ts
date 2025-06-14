
import { useCallback } from "react";
import { useSearchCommands } from "./useSearchCommands";

/**
 * Custom hook to control the global search modal from anywhere.
 * Returns an openSearch function you can call to open the SearchCommand dialog.
 */
export function useGlobalSearchModal() {
  const { setOpen } = useSearchCommands();

  // Returns a callback that can be used in onClick etc
  const openSearch = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return { openSearch };
}
export default useGlobalSearchModal;
