/**
 * Suggerimenti sotto un campo di testo (combobox accessibile), come nel sito Gromia:
 * frecce per scorrere, Invio per scegliere, Esc per chiudere.
 */
import type { Place } from './geocoding';

let uid = 0;

export function attachAutocomplete(
  input: HTMLInputElement,
  fetcher: (text: string) => Promise<Place[]>,
  onChoose: (p: Place) => string,
): void {
  const list = document.createElement('div');
  list.className = 'suggestions';
  list.setAttribute('role', 'listbox');
  list.id = `suggestions-${++uid}`;
  input.parentElement!.classList.add('has-suggestions');
  input.after(list);
  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-controls', list.id);
  input.setAttribute('aria-expanded', 'false');
  input.autocomplete = 'off';

  let items: Place[] = [];
  let active = -1;
  let timer = 0;
  let request = 0;

  function render(): void {
    list.replaceChildren(
      ...items.map((p, i) => {
        const node = document.createElement('div');
        node.className = 'suggestion';
        node.setAttribute('role', 'option');
        node.id = `${list.id}-${i}`;
        node.dataset.index = String(i);
        node.setAttribute('aria-selected', String(i === active));
        const b = document.createElement('b');
        b.textContent = p.title;
        const small = document.createElement('small');
        small.textContent = p.subtitle;
        node.append(b, small);
        return node;
      }),
    );
    input.setAttribute('aria-expanded', String(items.length > 0));
    if (active >= 0) input.setAttribute('aria-activedescendant', `${list.id}-${active}`);
    else input.removeAttribute('aria-activedescendant');
  }
  const close = () => {
    items = [];
    active = -1;
    render();
  };
  const choose = (i: number) => {
    const p = items[i];
    if (!p) return;
    input.value = onChoose(p);
    input.dispatchEvent(new Event('change', { bubbles: true }));
    close();
  };
  async function search(text: string): Promise<void> {
    const mine = ++request;
    let found: Place[] = [];
    try {
      found = await fetcher(text);
    } catch {
      found = [];
    }
    if (mine !== request) return;
    items = found;
    active = items.length ? 0 : -1;
    render();
  }

  input.addEventListener('input', () => {
    const text = input.value.trim();
    window.clearTimeout(timer);
    if (text.length < 3) return close();
    timer = window.setTimeout(() => void search(text), 220);
  });
  input.addEventListener('keydown', (e) => {
    if (!items.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length;
      render();
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault();
      choose(active);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  });
  // mousedown (non click): la scelta avviene prima che il campo perda il fuoco
  list.addEventListener('mousedown', (e) => {
    const option = (e.target as HTMLElement).closest<HTMLElement>('[data-index]');
    if (!option) return;
    e.preventDefault();
    choose(Number(option.dataset.index));
  });
  input.addEventListener('blur', () => window.setTimeout(close, 120));
}
