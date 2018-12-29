"use babel";

/**
 * Return array of keybinding objects that exactly match a keystroke.
 */
const exactMatchCandidates = event =>
  atom.keymaps.findMatchCandidates(event.keystrokes.split(" "))
    .exactMatchCandidates;

/**
 * Return the most specific keybinding object that exactly matches the event's
 * keystroke and target.
 */
export const findBestExactMatch = event => {
  const candidates = exactMatchCandidates(event);

  const traverse = target => {
    const exactMatches = atom.keymaps.findExactMatches(candidates, target);

    // An exact match for target has been found. Return the most
    // specific (ordered by keybinding selector specificity) match.
    if (exactMatches.length) {
      return exactMatches[0];
    }

    // No exact match has been found for the target's document.
    if (!target.parentElement) {
      return null;
    }

    // Traverse to the target's parent
    return traverse(target.parentElement);
  };

  return candidates.length === 0 || event.keyboardEventTarget === null
    ? null
    : traverse(event.keyboardEventTarget);
};
