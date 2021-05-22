  export interface IItemsMovedEvent {
    available: Array<{}>;
    selected: Array<{}>;
    movedItems: Array<{}>;
    from: 'selected' | 'available';
    to: 'selected' | 'available';
  }
  