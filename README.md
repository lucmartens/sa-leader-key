# sa-leader-key

Atom plugin to prevent dispatching commands bound to a subsequence of keybindings starting with &lt;leader&gt;.

## Motivation

When a sequence of keystrokes does not exactly match a keybinding, atom will attempt to match subsequences of the original sequence. For example, given a keymap:

```
'atom-workspace atom-text-editor.vim-mode-plus:not(.insert-mode)':
  'space p o': 'application:add-project-folder'
  'p': 'vim-mode-plus:put-after'
```

Entering the `space p o` sequence incorrectly (e.g `space p j`) will attempt to find matches for `space p` and `p`. Since we have a matching keybinding for `p`, the `vim-mode-plus:put-after` command is dispatched. Partially entering the `space p o` sequence (e.g `space p`) will, after a timeout, attempt to find matches for `p`.

This behaviour is undesirable when you want to cancel matching a sequence of keystrokes, or want to provide discoverable keybindings.

## Usage

Bind the desired leader key in your `keymap.cson`:

```
'atom-workspace atom-text-editor.vim-mode-plus:not(.insert-mode)':
  'space': 'leader-key:toggle'
```
