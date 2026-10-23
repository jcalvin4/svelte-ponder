export function useInlineEdit<T extends Record<string, any>>(
  initial: T,
  onSave: (value: T) => Promise<void> | void
) {
  // $state.snapshot gives a plain copy, so draft and original never share references
  const draft = $state($state.snapshot(initial) as T);
  let original = $state($state.snapshot(initial) as T);

  // a function, so it re-reads draft and original every time it's called
  const isDirty = $derived(
    () => JSON.stringify(draft) !== JSON.stringify(original)
  );

  async function save() {
    const value = $state.snapshot(draft) as T;
    await onSave(value);
    original = value;
  }

  function cancel() {
    Object.assign(draft, $state.snapshot(original));
  }

  function reset(newValue: T) {
    original = $state.snapshot(newValue) as T;
    Object.assign(draft, $state.snapshot(newValue));
  }

  return {
    draft,
    isDirty,
    save,
    cancel,
    reset
  };
}