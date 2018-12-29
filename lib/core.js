"use babel";

import { CompositeDisposable } from "atom";
import { findBestExactMatch } from "./keymap";

const leaderCommand = "leader-key:toggle";

class LeaderKey {
  active = true;
  subscriptions = null;
  timeout = atom.keymaps.partialMatchTimeout;

  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add("atom-workspace", { [leaderCommand]: () => {} }),

      atom.keymaps.onDidPartiallyMatchBindings(e => {
        const binding = findBestExactMatch(e);
        if (binding && binding.command === leaderCommand) {
          this.timeout = atom.keymaps.partialMatchTimeout;
          atom.keymaps.partialMatchTimeout = 9999999;
          this.active = true;
        }
      }),

      atom.keymaps.onDidMatchBinding(e => {
        if (this.active) {
          atom.keymaps.partialMatchTimeout = this.timeout;
          this.active = false;
        }
      }),

      atom.keymaps.onDidFailToMatchBinding(e => {
        if (this.active) {
          atom.keymaps.partialMatchTimeout = this.timeout;
          atom.keymaps.cancelPendingState();
          this.active = false;
        }
      })
    );
  }

  deactivate() {
    atom.keymaps.partialMatchTimeout = original;
    this.subscriptions.dispose();
  }
}

export default new LeaderKey();
